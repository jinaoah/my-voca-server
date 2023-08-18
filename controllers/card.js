const Card = require('../models/Card');

module.exports.add = async (req, res) => {
    try {
        console.log(req.body.card);
        const word = req.body.card.word;
        const mean = req.body.card.mean;
        const partOfSpeech = req.body.card.partsOfSpeech;
        const isBookmarked = req.body.card.isBookmarked ? 1 : 0;
        const isChecked = req.body.card.isChecked ? 1: 0;
        //sentence 테이블
        const sentenceValues = req.body.card.sentences.map(sentenceObj => sentenceObj.sentence);
        const transValues = req.body.card.sentences.map(sentenceObj => sentenceObj.translation);
        // user 닉네임
        const nickname = req.body.nickname;
        console.log('문장 출력해보기',sentenceValues);

        const result = await Card.AddWord({word, mean, partOfSpeech, isBookmarked, isChecked, nickname});
        const result2 = await Card.addSen(sentenceValues, transValues);
        res.json(result2);
    } catch (err) {
        console.log('card 컨틀롤러 : ', err);
    }
}
module.exports.update = async (req, res) => {
    try {
        // console.log(req.body.card);
        // console.log(req.body.nickname)
        const word = req.body.card.word;
        const mean = req.body.card.mean;
        const partOfSpeech = req.body.card.partsOfSpeech;
        const isBookmarked = req.body.card.isBookmarked ? 1 : 0;
        const isChecked = req.body.card.isChecked ? 1: 0;
        const nickname = req.body.nickname;
        //sentence 테이블
        const sentenceValues = req.body.card.sentences.map(sentenceObj => sentenceObj.sentence);
        const transValues = req.body.card.sentences.map(sentenceObj => sentenceObj.translation);
        const result = await Card.update(
            {word, mean, partOfSpeech, isBookmarked, isChecked, nickname});
        const result2 = await Card.updateSen(sentenceValues, transValues)
        res.json(result2);
    } catch (err) {
        console.log('업데이트 에러', err)
    }
}

module.exports.delete = async (req, res) => {
    try {
        const word = req.params;
        const result = await Card.deleteWord(word);
        res.json(result);
    } catch(err) {

    }
}

module.exports.getAllSen = async (req, res) => {
    try {
        const result = await Card.getAllSen();
        // console.log('카드 컨트롤러 ->',result)
        res.json(result);
    } catch (error) {
        console.log('문장 데이터 가져오기 실패', error);
    }
}

module.exports.getCnt = async(req, res) => {
    try {
        const nickname = req.params;
        // 내가 기록한 단어 총 개수
        const totalCnt = await Card.getTotal(nickname);
        const todayCnt = await Card.getTodayTotal(nickname);
        res.send([totalCnt, todayCnt]);
    } catch (err) {
        console.log('getCnt 실패',err)
    }
}

module.exports.getJoinWord = async(req, res) => {
    try {
        console.log('getJoinWord 컨트롤러',req.params);
        const sentenceID = req.params.sentenceID;
        const joinWords = await Card.getJoinWord(sentenceID);
        res.json(joinWords);
        // console.log(joinWords);
    } catch (err) {
        throw err
    }
}

module.exports.getWord = async (req, res) => {
    try {
        
    } catch (err) {
        
    }
}