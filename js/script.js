// Dom Variables

let word = document.getElementsByClassName('word')[0],

    paragraph = document.getElementsByClassName('paragraph')[0],

    generate = document.getElementsByClassName('generate')[0],

    result = document.getElementsByClassName('result')[0],

    toBtn = document.getElementsByClassName('toBtn')[0],

    // Data Variables

    myRequest,

    myData;

// Events

generate.addEventListener('click', checkToGenerate)

document.addEventListener('click', copyText)

// 
function checkToGenerate() {

    // if word value is empty
    if (word.value == "") {

        alert(`Enter count of words`)

        return false

    }

    //
    else {

        //
        if (paragraph.value > 99 || word.value > 99) {

            alert('length cannot be more than 100')

            return false

        }

        //
        else {

            // show loading image
            result.innerHTML = `<img src="img/loading.svg" alt="loading image">`

            getData()

        }

    }

}

// function to generate words based on user values
function getData() {

    myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            myData = JSON.parse(this.responseText).fullWords[0].split(' '),

                genLorem(result, +paragraph.value, +word.value, myData, toBtn)

        }

    }

    myRequest.onerror = function () {
        throw 'Request Failed'
    }

    myRequest.open("GET", 'data/lorem.js', true)

    myRequest.send()

}

// function to display generated words to dom
function genLorem(whereToWrite, pCount, wCount, array, addCopyBtn) {

    //
    if (pCount == undefined || pCount <= 1) {

        whereToWrite.innerHTML = `<p>${array.splice(0, wCount).join(' ')}.</p>`

    }

    //
    if (pCount > 1) {

        for (let i = 0; i < pCount; i++) {

            //
            if (i == 0) {

                whereToWrite.innerHTML = `<p>${array.splice(0, wCount).join(' ')}.</p>`

                whereToWrite.innerHTML += '\n'

            }

            //
            else {

                whereToWrite.innerHTML += `<p>${array.splice(wCount, wCount).join(' ')}.</p>`

                whereToWrite.innerHTML += '\n'

            }

        }

        addCopyBtn.innerHTML = `<button>Copy Text</button>`

    }

}

// function to create an invisible textarea to allow copy
function copyToClipboard(text) {

    const element = document.createElement('textarea');

    element.value = text;

    document.body.appendChild(element);

    element.select();

    document.execCommand('copy');

    document.body.removeChild(element)

}

// function to generated words on click
function copyText(event) {

    if (event.target.innerText == 'Copy Text') {

        copyToClipboard(result.innerText)

        alert('Text Copied')

    }

}