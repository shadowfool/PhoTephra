// import React from 'react';
// import ReactDOM from 'react-dom';
// import _ from 'lodash';
// import AboutUs from './aboutUs';
// import Login from './login';
// import Nav from './nav';
// import Slides from './slides';
var $ = require('jquery');
// var express = require('express');
// var app = express();
// const Clarifai = require('clarifai');
// import Loading from './loading';

var stuff = {
	username: 'andy',
};

// $.post({
// 	url: 'api/save',
// 	data: JSON.stringify(stuff),
// 	contentType: 'application/json',
// })
// .done((data) => {
// 	console.log(data);
// 	console.log('success');
// })
// .fail((err) => {
// 	console.error(err);
// });

// $.post('api/save', stuff, function(data,status){
// 	console.log(status);
// });

 $.ajax({
   type: 'POST',
   url: 'api/save',
   data: JSON.stringify(stuff),
   success: function()
   {
       console.log('success');
   },
   error: function()
   {
       console.log('fail');
   },
 });