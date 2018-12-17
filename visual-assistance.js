/*visual-assistance*/
import { objData } from '/static.js'


function pageTransition() {
    console.log(objData)
    buildList(objData)
    $('.mtb-image').slideUp(2000)
    $('.banner').slideUp(2000)
    setTimeout(function() {
        $('.banner').replaceWith($('.trail-search-form'))}, 2000)
        $('.trail-search-form').slideUp().slideDown(500) 
    $('html').append(resultsTemplate)  
    // $('.mtb-image').replaceWith(resultsTemplate)
    $('.mtb-trail-search-input').val('')
}

function showText(text) {
    text.addClass('show')
    // $('.2').addClass('show')
    // $('.3').addClass('show')
    // $('.4').addClass('show')
}

$(document).ready(function(){
    
    showText($('.1'))
    setTimeout(function() {
        showText($('.2'))}, 1000)
    setTimeout(function() {
        showText($('.3'))}, 2000)
    setTimeout(function() {
        showText($('.4'))}, 3000) 
})