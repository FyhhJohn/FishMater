cc.TextUtils.fragmentText = function (stringToken, allWidth, maxWidth, measureText) {
    //check the first character
    var wrappedWords = [];
    //fast return if strArr is empty
    if (stringToken.length === 0 || maxWidth < 0) {
        wrappedWords.push('');
        return wrappedWords;
    }

    var text = stringToken;
    while (allWidth > maxWidth && text.length > 1) {

        var fuzzyLen = text.length * (maxWidth / allWidth) | 0;
        var tmpText = text.substr(fuzzyLen);
        var width = allWidth - measureText(tmpText);
        var sLine = tmpText;
        var pushNum = 0;

        var checkWhile = 0;
        var checkCount = 10;

        //Exceeded the size
        while (width > maxWidth && checkWhile++ < checkCount) {
            fuzzyLen *= maxWidth / width;
            fuzzyLen = fuzzyLen | 0;
            tmpText = text.substr(fuzzyLen);
            width = allWidth - measureText(tmpText);
        }
        sLine = tmpText
        checkWhile = 0;

        //Find the truncation point
        while (width < maxWidth && checkWhile++ < checkCount) {
            if (tmpText) {
                var exec = this.label_wordRex.exec(tmpText);
                pushNum = exec ? exec[0].length : 1;
                sLine = tmpText;
            }

            fuzzyLen = fuzzyLen + pushNum;
            tmpText = text.substr(fuzzyLen);
            width = allWidth - measureText(tmpText);
        }

        fuzzyLen -= pushNum;
        if (fuzzyLen === 0) {
            fuzzyLen = 1;
            sLine = sLine.substr(1);
        }

        var sText = text.substr(0, fuzzyLen), result;

        //symbol in the first
        if (this.label_wrapinspection) {
            if (this.label_symbolRex.test(sLine || tmpText)) {
                result = this.label_lastWordRex.exec(sText);
                fuzzyLen -= result ? result[0].length : 0;
                if (fuzzyLen === 0) fuzzyLen = 1;

                sLine = text.substr(fuzzyLen);
                sText = text.substr(0, fuzzyLen);
            }
        }

        //To judge whether a English words are truncated
        if (this.label_firstEnglish.test(sLine)) {
            result = this.label_lastEnglish.exec(sText);
            if (result && sText !== result[0]) {
                fuzzyLen -= result[0].length;
                sLine = text.substr(fuzzyLen);
                sText = text.substr(0, fuzzyLen);
            }
        }

        // The first line And do not wrap should not remove the space
        if (wrappedWords.length === 0 && (sLine === '' && tmpText === '')) {
            wrappedWords.push(sText);
        }
        else {
            sText = sText.trim();
            if (sText.length > 0) {
                wrappedWords.push(sText);
            }
        }
        text = sLine || tmpText;
        allWidth = measureText(text);
    }

    if (wrappedWords.length === 0) {
        wrappedWords.push(text);
    }
    else {
        text = text.trim();
        if (text.length > 0) {
            wrappedWords.push(text);
        }
    }
    return wrappedWords;
};
