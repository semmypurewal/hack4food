/**********************************************************
 * TEMP DUMMY DATA!
 **********************************************************/
var messages = [
    new Message (
        "828-867-5309",
        1370110898,
        "Shiloh"
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

/**********************************************************
 * Globals
 **********************************************************/
var restUrlBase = "";
var communities = [];
//var messages = [];

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
 * @param {string} number Phone number that sent SMS
 * @param {timestamp} date Timestamp SMS was sent
 * @param {string} text Timestamp SMS was sent
 * @returns {Message}
 */
function Message ( number, date, text ) {
    this.number = number;
    this.date = date;
    this.text = text;
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
    communities["Shiloh"] = new Community(
        "shiloh",
        "123 Shiloh Rd",
        "Pumpkin Love: 41%"
    );
    communities["Pisgah View"] = new Community(
        "pisgahview",
        "345 Pisgah View Way",
        "Pumpkin Love: 22%"
    );
    communities["Other"] = new Community(
        "other",
        "",
        ""
    );

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

    $('#sms-list').html('<th></th><th>Number</th><th>Body</th>');

    for ( var i = 0; i < messages.length; i++ ) {
        $('#sms-list').append(
            '<tr>' +
            '<td><input type="checkbox" id="cbx_' + messages[i].number + '"></td>' +
            '<td>' + messages[i].number + '</td>' +
            '<td>' + messages[i].text + '</td>' +
            '</tr>'
        );
    }
}

/**
 * Performs AJAX call to get messages based on selected community
 *
 * @param {string} endPoint REST endpoint
 */
function getMessages( endPoint ) {
    console.log(endPoint);

    var restUrl = restUrlBase + endPoint;
    $.get(
          restUrl,
          function(data, status) {
              if (status === "success") {
                  messages = data;
                  setMessageTable(data);
              }
          }
    );
}

/**
 * Returns a list of all messages that are checked
 *
 * @returns {Array.<Message>}
 */
function getSelectedMessages( ) {

}

// --COMMUNITY---------------------------------------------
function changeCommunity( community ) {
    // TODO: enable this once we're ready to AJAX
    //getMessages( community.endPoint );
}

function setCommunityInfo( community ) {

}

// --DATE--------------------------------------------------




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


    $("#date-range").weeklyDatePicker({
        weeks: weeks,
        onchange: function(week, index, weeks) {
            var filtered = filterSmsData(messages, week.startDate, week.endDate);
            setMessageTable(filtered);
        }
    });
