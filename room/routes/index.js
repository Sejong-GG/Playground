const express = require('express');

const router = express.Router();
const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

// / -> get
router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.render('main', { rooms, title: 'GIF 채팅방' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// /room -> get
router.get('/room', (req, res) => {
  res.render('room', { title: 'GIF 채팅방 생성' });
});

// /room -> post
router.post('/room', async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      owner: req.session.color,
      password: req.body.password,
    });
    const io = req.app.get('io');
    io.of('/room').emit('newRoom', newRoom);
    res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// /room/{id}?password={pw} -> 
router.get('/room/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });  // id가 3인 채팅방을 조회해라
    const io = req.app.get('io');                             //  
    // 방이 있는지
    if (!room) {
      return res.redirect('/?error=존재하지 않는 방입니다.');
    }
    // 비밀번호 맞는지
    if (room.password && room.password !== req.query.password) {
      return res.redirect('/?error=비밀번호가 틀렸습니다.');
    }
    // 
    const { rooms } = io.of('/chat').adapter;

    console.log(rooms);

    // 허용인원 넘는지
    if (rooms && rooms[req.params.id] && room.max <= rooms[req.params.id].length) {
      return res.redirect('/?error=허용 인원이 초과하였습니다.');
    }
    
    return res.render('chat', {
      room,
      title: room.title,
      chats: [],
      user: req.session.color,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/room/:id/chat', async (req, res, next) => {
	console.log('submit 요청 받음');
	try {
	  	const chat = await Chat.create({
		room: req.params.id,
		user: req.session.color,
		chat: req.body.chat,
	  });
	  req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
	  console.log('/chat 요청 보냄');
	  res.send('ok');
	} catch (error) {
	  console.error(error);
	  next(error);
	}
  });

module.exports = router;