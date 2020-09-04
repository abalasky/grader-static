

const endpoint = "https://prephq-grader.herokuapp.com/gradersubmit"

document.addEventListener('DOMContentLoaded', function() {
    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;


    //Click listener for Get Score button
    $(".next").click(function() {

        //Check for empty fields
        let animateOk = validate();
        if (!animateOk) {
            return;
        }

        //POST form data to server
        let test = document.querySelector('#testSelect').value;
        const testName = test.substring(0,3);
        const testNum = test.substring(4);
        const section = document.querySelector('#sectionSelect').value;
        //Strip whitespace from first and last name
        const firstName = document.querySelector('#firstname').value.trim();
        const lastName = document.querySelector('#lastName').value.trim();
        const numCorrect = document.querySelector('#numCorrect').value;



        //Data to be sent
        const data = {
            'firstName':firstName,
            'lastName': lastName,
            'testName': testName,
            'testNum': testNum,
            'section': section,
            'numCorrect': numCorrect
        }


        //Show corresponding info on score page
        let converted = displayConversion(testNum, testName, section, numCorrect);

        //Add converted to the form data
        data.converted = converted;

        //Params of request
        const options = {
            'method': 'POST',
            'content-type': 'application/json',
            'body': JSON.stringify(data)
        }

        //POST
        fetch(endpoint, options)
            .then(response => response.text())
            .catch(err => console.log(err));

        console.log('Called fetch to', endpoint)


        //Animate to ACT/SAT score page
        animating = true;
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now, mx) {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + "%";
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')'
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutExpo'
        });
    });
});

//Displays score conversion based on form data
function displayConversion(testNumber, testName, section, numCorrect) {

    //Set title message
    document.querySelector('#testTitle').innerHTML = testName + ' Score';
    let score = document.querySelector('#scoreConversion');

    let conversion;

    //Display correct test conversion
    if (testName === 'SAT') {
        if (testNumber == 1) {
            score.innerHTML = numCorrect;
        }
        else {
            score.innerHTML = numCorrect;
        }
    }
    else {
        //Allow string to int coersion
        if (testNumber == 1) {
            conversion = actTest1[section][numCorrect];
            score.innerHTML = conversion;
        }
        else {
            conversion = actTest2[section][numCorrect];
            score.innerHTML = conversion;
        }
    }

    return conversion;

}

//Validate form. Check for empty fields
//Check to make sure numCorrect is in range
function validate() {


    let field1 = document.querySelector('#firstname').value;
    let field2 = document.querySelector('#lastName').value;
    let field3 = document.querySelector('#numCorrect').value;

    let animateOk = true;

    //Checks for empty fields
    if(field1 === "" || field2 === "" || field3 === "") {
        document.querySelector('#fieldError').style.display = 'block';
        animateOk = false;
    }

    let section = document.querySelector('#sectionSelect').value.toLowerCase();

    //Checks that numCorrect is in range
    if(field3 < 0 || field3 > actTest1[section].length-1) {
        document.querySelector('#scoreError').style.display = 'block';
        animateOk = false;
    }

    return animateOk;
}




//***Hard Coded Test Conversions****
//**********************************

const actTest1 = {
    'english': [1,1,1,2,2,3,3,4,4,5,5,6,6,6,7,7,7,
        8,8,8,9,9,9,10,10,11,11,11,12,12,13,14,14,14,15,15,15,16,16,16,17,17,
        18,18, 19, 19, 20,20,20,21,21,21,21,22,22,22,23,23,24,24,24,25,25,26,26,27,
        28,28, 29, 30, 31, 32, 33, 34, 35, 36],
    'math': [1, 4, 6, 7, 9, 10, 10, 11, 12, 12, 13, 13, 14, 14, 14, 15, 15, 15, 15,
        16, 16, 16, 16, 16, 17, 17, 17, 18, 18, 19, 19,20, 20, 20, 22, 22, 23, 23,
        24, 24, 24, 25, 25, 25, 26, 26, 27, 27, 27, 28, 29, 29, 30, 30, 31, 32, 33, 34,
        35, 36, 36],
    'reading': [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12, 12, 13, 14, 14, 15, 15, 16,
        17, 18, 18, 19, 20, 20, 21, 22, 23, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
        34, 35, 36],
    'science': [1,2,4,6,7,8,9,10,10,11,12,13,13,14,15,16,16,17,17,18,18,
        19,19,20,20,21,21,22,23,23,24,25,25,26,27,28,29,30,32,34,36]
};



const actTest2 = {
    'english': [1,1,1,2,2,3,3,4,4,5,5,6,6,6,7,7,7,
        8,8,8,9,9,9,10,10,11,11,11,12,12,13,14,14,14,15,15,15,16,16,16,17,17,
        18,18, 19, 19, 20,20,20,21,21,21,21,22,22,22,23,23,24,24,24,25,25,26,26,27,
        28,28, 29, 30, 31, 32, 33, 34, 35, 36],
    'math': [1, 4, 6, 8, 10, 11, 11, 12, 13, 13, 14, 14, 14, 15,    15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 21, 21, 22, 23, 23, 24, 24, 24, 25, 25, 26, 26, 26, 27, 27, 27, 28, 28, 29, 30, 31, 31 , 32, 32, 33, 34, 34, 34, 35, 35, 36, 36],
    'reading': [1,3,4,6,7,8,9,10,11,1,12,13,13,14,15,16,17,17,
        18,19,20,20,21,22,23,23,24,25,27,27,28,29,30,31,32,
        33,34,34,35,36,36],
    'science': [1,3,5,6,8,9,10,11,12,13,14,14,15,16,17,17,18,
        19,19,20,20,21,21,22,23,2,24,25,27,27,28,29,30,31,32,33,34,34,35,36,36]
};

const satTest1  = {
    'math': []
};

const satTest2 = {
    'math': []
};

