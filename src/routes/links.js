const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        idUser: req.user.idUser
    };
    await pool.query('INSERT INTO links SET ?', [newLink]);
    req.flash('success', 'Link saved succesfully');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async(req, res) =>{
    const links = await pool.query('SELECT * FROM links WHERE idUser = ?', [req.user.idUser]);
    res.render('links/list', { links });
});

router.get('/delete/:idLink', isLoggedIn, async (req, res) => {
    const { idLink } = req.params;
    await pool.query('DELETE FROM links WHERE idLink = ?', [idLink]);
    req.flash('success', 'Link removed succesfully');
    res.redirect('/links');
});

router.get('/edit/:idLink', isLoggedIn, async (req, res) => {
    const { idLink } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE idLink = ?', [idLink]);
    res.render('links/edit', { links: links[0] });  // solo un objeto, ya que el id es unico
});

router.post('/edit/:idLink', isLoggedIn, async (req, res) => {
    const { idLink } = req.params;
    const { title, url, description } = req.body;
    const newLink = {
        title, 
        url,
        description
    };
    await pool.query('UPDATE links SET ? WHERE idLink = ?', [newLink, idLink]);
    req.flash('success', 'Link updated succesfully');
    res.redirect('/links');
});

module.exports = router;