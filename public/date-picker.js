(function($, undefined) {




    $.fn.weeklyDatePicker = function(options) {
        $(this).filter("select").each(function() {
            $(this).find("option").remove();

            _.each(options.weeks, function(week, index) {
                var $option = $("<option/>");
                $option.text(week.startDate.format("YYYY/MM/DD") + " - " + week.endDate.format("YYYY/MM/DD"));
                $option.val(index);

                $(this).append($option);
            }, this);

            $(this).on("change", function(event) {
                var index = parseInt($(event.target).val(), 10);
                var week = options.weeks[index];
                options.onchange(week, index, options.weeks);
            });

        });

        return this;
    }



})(jQuery);