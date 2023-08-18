const Card = {};
const oracledb = require("oracledb");
const config = require("../db.js");

Card.AddWord = async ({word, mean, partOfSpeech, isBookmarked, isChecked, nickname}) => {
    try {
        const connection = await oracledb.getConnection(config); // 데이터베이스 연결을 얻습니다.
        const sql = `INSERT INTO words (word, mean, part_of_speech, isBookmarked, isChecked, nickname)
            VALUES(:word, :mean, :partOfSpeech, :isBookmarked, :isChecked, :nickname)`;
        const data = {
            word: word,
            mean: mean,
            partOfSpeech: partOfSpeech,
            isBookmarked: isBookmarked,
            isChecked: isChecked,
            nickname: nickname
        }
        const result = await connection.execute(sql, data, {autoCommit: true});
        console.log('데이터 삽입 ->', result);
    } catch(err) {

    }
}

Card.deleteWord = async (word) => {
    try {
        const connection = await oracledb.getConnection(config);
        const sql = `DELETE FROM words WHERE word = :word`;
        const result = await connection.execute(sql, word, {autoCommit: true});
        console.log('데이터 삭제 ->', result);
    } catch(err) {

    }
}

Card.getAllSen = async () => {
    try {
        const connection = await oracledb.getConnection(config);
        const sql = `SELECT DISTINCT SENTENCE_TEXT, sentence_meaning, sentence_id FROM sentences`;
        const result = await connection.execute(sql);
        return result.rows;
    } catch (err) {
        console.log('문장 데이터 가져오기 -> ', err)
    }
}

Card.addSen = async (sentences, translations) => {
    try {
        const connection = await oracledb.getConnection(config);
        const sql = `INSERT INTO SENTENCES (SENTENCE_ID, SENTENCE_TEXT, SENTENCE_MEANING)
            VALUES(SENTENCE_ID_SEQ.NEXTVAL, :SENTENCE_TEXT, :SENTENCE_MEANING)`;
        
            // console.log('문장 길이', sentences.length)
        for (let i = 0; i < sentences.length; i++) {
            const result = await connection.execute(sql, {
                SENTENCE_TEXT: sentences[i],
                SENTENCE_MEANING: translations[i]
            }, {autoCommit: true});
            console.log('문장 삽입 ->',result.rowsAffected);
        }
    } catch (err) {
        console.log('문장 테이블 에러', err)
    }
}

Card.update = async ({word, mean, partOfSpeech, isBookmarked, isChecked, nickname}) => {
    const connection = await oracledb.getConnection(config);

    const data = {
        word: word,
        mean: mean,
        partOfSpeech: partOfSpeech,
        isBookmarked: isBookmarked,
        isChecked: isChecked,
        nickname: nickname
    }
    const sql = `UPDATE words SET mean = :mean, part_of_speech = :partOfSpeech,
        isBookmarked = :isBookmarked,
        isChecked = :isChecked
    WHERE
        word = :word AND nickname = :nickname`;
    
    const result = await connection.execute(sql, data, {autoCommit: true});
    console.log('update 모델', result);
}

Card.updateSen = async (sentences, translations) => {
    const connection = await oracledb.getConnection(config);

    const sql = `UPDATE sentences SET SENTENCE_TEXT = :SENTENCE_TEXT,
    SENTENCE_MEANING = :SENTENCE_MEANING WHERE `;
    for (let i = 0; i < sentences.length; i++) {
        const result = await connection.execute(sql, {
            SENTENCE_TEXT: sentences[i],
            SENTENCE_MEANING: translations[i]
        }, {autoCommit: true});
        console.log('문장 삽입 ->',result.rowsAffected);
    }
}

Card.getTotal = async (nickname) => {
    try {
        const connection = await oracledb.getConnection(config);
        const sql = `SELECT COUNT(word) FROM words WHERE nickname = :nickname`;
        const result = await connection.execute(sql, nickname);
        return result.rows[0];
    } catch (err) {
        console.log('getTotal 모델 에러', err)
    }
}
Card.getTodayTotal = async (nickname) => {
    try {
        const connection = await oracledb.getConnection(config);
        const sql = `SELECT COUNT(word) FROM words WHERE nickname = :nickname
        AND TRUNC(add_date) = TRUNC(SYSDATE)`;
        const result = await connection.execute(sql, nickname);
        return result.rows[0];
    } catch (err) {
        console.log('getTotal 모델 에러', err)
    }
}
Card.getJoinWord = async (sentence_id) => {
    try {
        const connection = await oracledb.getConnection(config);
        console.log('sentence_id : ', sentence_id);
        const sql = `SELECT DISTINCT w.word FROM words w
        JOIN sentences s ON s.sentence_text LIKE '%' || w.word || '%' WHERE sentence_id = :sentence_id`;
        console.log('sql ->', sql);
        const result = await connection.execute(sql, [sentence_id], {autoCommit: true});
        return result.rows;
    } catch (err) {
        throw err;
    }
}
module.exports = Card;