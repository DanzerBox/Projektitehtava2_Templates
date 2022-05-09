const entries = [];

const renderGuestbook = (req, res) =>{
    res.render('index', {entries});
};

const renderNewMessage= (req, res) =>{
    res.render('new-message', {entries});
};



const createNewMessage= (req, res) =>{
    const newMessage = {
       title: req.body.username,
       name: req.body.country,
       content: req.body.message,
       
    };
    entries.push(newMessage);
    res.redirect('/info');

};

//ajax testaus
const renderAjaxMessage= (req, res) =>{
    res.render('ajax-message');
};

//ajax testaus
const createAjaxMessage= (req, res) =>{
    const ajaxMessage = {
       title: req.body.user,
       name: req.body.land,
       content: req.body.letter,
       
    };
    entries.push(ajaxMessage);
    res.redirect('/ajax-message');

};

module.exports = {
    renderGuestbook,
    renderNewMessage,
    createNewMessage,
    renderAjaxMessage,
    createAjaxMessage,

}