import * as Lang from './lang'
import * as Msg from './msg'
import Emitter from './emitter'
import $ from 'jquery'
import * as Ajax from './ajax'

/**
 * Опросы
 */

/**
 * Голосование в опросе
 */
export function vote(idTopic, idAnswer) {
    var url = aRouter['ajax'] + 'vote/question/';
    var params = {idTopic: idTopic, idAnswer: idAnswer};
    Emitter.emit('voteBefore');
    Ajax.ajax(url, params, function (result) {
        if (result.bStateError) {
            Msg.error(null, result.sMsg);
        } else {
            Msg.notice(null, result.sMsg);
            var area = $('#topic_question_area_' + idTopic);
            Emitter.emit('voteDisplayBefore');
            area.html(result.sText);
            Emitter.emit('ls_pool_vote_after', [idTopic, idAnswer, result], area);
        }
    });
};

/**
 * Добавляет вариант ответа
 */
export function addAnswer() {
    if ($("#question_list li").length == 20) {
        Msg.error(null, Lang.get('topic_question_create_answers_error_max'));
        return false;
    }
    var newItem = $("#question_list li:first-child").clone();
    newItem.find('a').remove();
    var removeAnchor = $('<a href="#"/>').text(Lang.get('delete')).click(function (e) {
        e.preventDefault();
        return this.removeAnswer(e.target);
    }.bind(this));
    newItem.appendTo("#question_list").append(removeAnchor);
    newItem.find('input').val('');
    Emitter.emit('ls_pool_add_answer_after', [removeAnchor], newItem);
};

/**
 * Удаляет вариант ответа
 */
export function removeAnswer(obj) {
    $(obj).parent("li").remove();
    return false;
};

export function switchResult(obj, iTopicId) {
    if ($('#poll-result-sort-' + iTopicId).css('display') == 'none') {
        $('#poll-result-original-' + iTopicId).hide();
        $('#poll-result-sort-' + iTopicId).show();
        $(obj).toggleClass('active');
    } else {
        $('#poll-result-sort-' + iTopicId).hide();
        $('#poll-result-original-' + iTopicId).show();
        $(obj).toggleClass('active');
    }
    return false;
};
