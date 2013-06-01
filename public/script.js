/**********************************************************
 * TEMP DUMMY DATA!
 **********************************************************/
var messages = [
    new Message (
        "828-867-5309",
        1370110898,
        "Shiloh I'm also a;lskdjf;alsdkfja;sldfkja;sdlkfja;sdlfkjas"
    ),
    new Message (
        "828-867-5310",
        1370110798,
        "shiloh"
    ),
    new Message (
        "828-867-5311",
        1370110698,
        "shilob"
    )
];
console.log(messages);

/**********************************************************
 * Globals
 **********************************************************/
var restUrlBase = "communities/";
var sendSmsUrl = "";

window.communities = {
    Shiloh: {
        endPoint: "shiloh",
        address: "123 Shiloh Rd",
        zipCode: "28804",
        facts: [{
                label: "Apple love",
                statistic: "43%"
            }, {
                label: "Pumpkin love",
                statistic: "34%"
            }, {
                label: "Population",
                statistic: "1,464,356"
            }
        ]
    },
    "Hillcrest": {
        endPoint: "hillcrest",
        address: "123 Hillcrest Rd",
        zipCode: "28804",
        facts: [{
                label: "Apple love",
                statistic: "23%"
            }, {
                label: "Pumpkin love",
                statistic: "84%"
            }, {
                label: "Population",
                statistic: "2,464,356"
            }
        ]
    },
    "Pisgah View": {
        endPoint: "pisgahview",
        address: "123 Pisgah Rd",
        zipCode: "28804",
        facts: [{
                label: "Apple love",
                statistic: "53%"
            }, {
                label: "Pumpkin love",
                statistic: "94%"
            }, {
                label: "Population",
                statistic: "3,464,356"
            }
        ]
    }
};

/**********************************************************
 * Objects
 **********************************************************/

/**
 * Creates an instance of Community
 *
 * @param {string} endPoint REST endpoint
 * @param {string} address Location address
 * @param {string} funFact1 funFact1
 * @returns {Community}
 */
function Community( endPoint, address, funFact1 ) {
    this.endPoint = endPoint;
    this.address = address;
    this.funFact1 = funFact1;
}

/**
 * Creates an instance of Message
 *
 * @param {string} phone Phone number that sent SMS
 * @param {timestamp} date Timestamp SMS was sent
 * @param {string} text Timestamp SMS was sent
 * @returns {Message}
 */
function Message ( phone, date, text ) {
    this.phone = phone;
    this.date = date;
    this.body = text;
}

/**********************************************************
 * Functions
 **********************************************************/
// --INIT--------------------------------------------------
$(document).ready(function(){
    // Build hard-coded community data
    communities = setCommunities ( communities );

    // Populate community dropdown list
    var select = $('#community-select').empty();
    for ( community in communities ) {
        select.append(
            $('<option></option>').val(community).text(community)
        );
    }

    // Attach community list change listener
    $(select).on('change', function(){
        changeCommunity( communities[$(this).val()] );
    });

    // Attach send function to send button
    $('#sms-send').on('click', function(){
        sendSMS();
    });

    // Fill message list with dummy data -- TODO REMOVE
    setMessageTable( messages );
});

/**
 * Set up hard-coded community info list
 *
 * @param {Array.<Community>} communities Global
 * @returns {setCommunities.communities}
 */
function setCommunities( communities ) {
    window.communities = communities;

    return communities;
}

// --MESSAGE-----------------------------------------------
/**
 * Populates the table of messsages sent from clients
 *
 * @param {Array.<Message>} messages
 */
function setMessageTable( messages ) {
    $('#sms-list').empty();

    if (messages.length > 0) {
        $('#sms-list').html('<th class="checkbox-column"></th><th class="phone-number-column">Number</th><th class="text-body-column">Body</th>');

        for ( var i = 0; i < messages.length; i++ ) {
            $('#sms-list').append(
                    '<tr>' +
                    '<td><input type="checkbox" id="cbx_' + messages[i].phone + '"></td>' +
                    '<td>' + messages[i].phone + '</td>' +
                    '<td>' + messages[i].body + '</td>' +
                    '</tr>'
            );
        }
    }
}

/**
 * Performs AJAX call to get messages based on selected community
 *
 * @param {string} endPoint REST endpoint
 */
function getMessages( endPoint ) {
    console.log(endPoint);

    var restUrl = restUrlBase + endPoint + ".json";
    $.get(
          restUrl,
          function(data, status) {
              if (status === "success") {
                  debugger;
                  messages = data;
                  var filtered = filterSmsData(messages, currentWeek.startDate, currentWeek.endDate);
                  setMessageTable(filtered);
              }
          }
    );
}

/**
 * Returns a list of all messages that are checked
 *
 * @returns {Array.<Message>}
 */
function sendSMS( ) {
    var recipients = $("#sms-list").find("input:checked").map(function() {
        return this.id.substr(4);
    }).toArray();

    var sms = { message : $("#sms-text").val(),
                recipients : recipients
    };

    $.post(
            sendSmsUrl,
            sms,
            function(data, status){

            }
    );
}

// --COMMUNITY---------------------------------------------
function changeCommunity( community ) {
    getMessages( community.endPoint );
}

function setCommunityInfo( community ) {

}

// Render the community info box on community-select change.
$("#community-select").on('change', function(event) {
    var $infoBox = $(".community").find("#info-box");
    $infoBox.find("li").remove();

    var community = communities[$("#community-select").val()];
    _.each(community.facts, function(fact, index) {
        var $label = $("<span />").addClass("statistic-label");
        $label.text(fact.label);
        var $value = $("<span />").addClass("statistic-value");
        $value.text(fact.statistic);

        var $li = $("<li/>");
        $li.html($label.html() + ": " + $value.html());

        $infoBox.append($li);
    }, this);
});

// --DATE PICKER DROPDOWN----------------------------------
// Generate an array of objects with startDate and endDate properties
// representing a givent week.
function generateWeeks(endDate, numWeeks) {
    var currentWeek;
    var i;
    var currentWeek = {
        startDate: moment(endDate).subtract('days', 6),
        endDate: moment(endDate)
    };
    var weeks = [ currentWeek ];

    for (i = 1; i < numWeeks; i++) {
        currentWeek = {
            startDate: moment(currentWeek.startDate).subtract('days', 7),
            endDate: moment(currentWeek.endDate).subtract('days', 7)
        };
        weeks.push(currentWeek);
    }

    return weeks;
}

function filterSmsData(unfilteredData, startMoment, endMoment) {
    return _.filter(unfilteredData, function(item) {
        var currentMoment = moment(item.date * 1000);
        return (currentMoment.isBefore(endMoment, "day") &&
            currentMoment.isAfter(startMoment, "day")) ||
            currentMoment.isSame(endMoment, "day") ||
            currentMoment.isSame(startMoment, "day")
    });
}

// 0=Sunday, ..., 6=Saturday
var startDay = 6;

var nextStartDate = moment();
nextStartDate.add('days', 6 - nextStartDate.day());
nextStartDate.startOf('day');
window.weeks = generateWeeks(nextStartDate, 6);
window.currentWeek = weeks[0];


$("#date-range").weeklyDatePicker({
    weeks: weeks,
    onchange: function(week, index, weeks) {
        var filtered = filterSmsData(messages, week.startDate, week.endDate);
        setMessageTable(filtered);
        currentWeek = week;
    }
});
