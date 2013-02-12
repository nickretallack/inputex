YUI.add('inputex-dateselectmonth', function (Y, NAME) {

/**
 * @module inputex-dateselectmonth
 */
  var lang = Y.Lang,
      inputEx = Y.inputEx;
	
	/**
	 * A field to enter a date with 2 strings and a select
	 * @class inputEx.DateSelectMonthField
	 * @extends inputEx.CombineField
	 */
	inputEx.DateSelectMonthField = function (options) {
		
		var formatSplit, selectOptions, i, j, monthsNb;
		
		// The ressource bundle is loaded here because
		// DateSelectMonthField needs them to construct his fields

		// this.messages will be overridden by the constructor of Field and re-loaded and mix in setOptions
		this.messages = Y.Intl.get("inputex-dateselectmonth");

		if (!options.dateFormat) {
			options.dateFormat = this.messages.defaultDateFormat;
		}
		
		formatSplit = options.dateFormat.split("/");
		
		this.yearIndex = inputEx.indexOf('Y', formatSplit);
		this.monthIndex = inputEx.indexOf('m', formatSplit);
		this.dayIndex = inputEx.indexOf('d', formatSplit);
		
		options.fields = [];
		
		for (i = 0 ; i < 3 ; i += 1) {
			
			if (i === this.dayIndex) {
				options.fields.push({ type: 'string', typeInvite: this.messages.dayTypeInvite, size: 2 });
			}
			else if (i === this.yearIndex) {
				options.fields.push({ type: 'string', typeInvite: this.messages.yearTypeInvite, size: 4 });
			}
			else {
				
				selectOptions = [{ value: '', label: this.messages.selectMonth }];
				
				for (j = 0, monthsNb = this.messages.months.length; j < monthsNb; j += 1) {
					selectOptions.push({ value: j, label: this.messages.months[j] });
				}
				
				options.fields.push({ type: 'select', choices: selectOptions, value: '' });
			}
			
		}
		
		options.separators = options.separators || [false, "&nbsp;", "&nbsp;", false];
		
		inputEx.DateSelectMonthField.superclass.constructor.call(this, options);
	};
	
	Y.extend(inputEx.DateSelectMonthField, inputEx.CombineField, {

		/**
		 * @method setOptions
		 */
		setOptions: function(options) {
			inputEx.DateSelectMonthField.superclass.setOptions.call(this, options);

			//I18N
			this.messages = Y.mix(this.messages, Y.Intl.get("inputex-dateselectmonth"));
		},
		
		/**
		 * @method setValue
		 */
		setValue: function (value, sendUpdatedEvt) {
			
			var values, i;
			
			values = [];
			
			// !value catches "" (empty field), other tests invalid dates (Invalid Date, or NaN)
			if (!value || !(value instanceof Date) || !lang.isNumber(value.getTime())) {
				values[this.monthIndex] = "";
				values[this.yearIndex] = "";
				values[this.dayIndex] = "";
			} else {
				for (i = 0 ; i < 3 ; i += 1) {
					values.push(i === this.dayIndex ? value.getDate() : (i === this.yearIndex ? value.getFullYear() : value.getMonth()));
				}
			}
			inputEx.DateSelectMonthField.superclass.setValue.call(this, values, sendUpdatedEvt);
		},
		
		/**
		 * @method getValue
		 */
		getValue: function () {
			
         // if all sub-fields are empty (isEmpty method is inherited from inputEx.Group)
			if (this.isEmpty()) { return ""; }
			
			var values = inputEx.DateSelectMonthField.superclass.getValue.call(this);
			
			// if selected month index is '', new Date(..) would create a valid date with month == January !!!)
			if (values[this.monthIndex] === '') {
				return new Date(NaN, NaN, NaN); // -> Invalid Date (Firefox) or NaN (IE) (both instanceof Date ...)
			}
			
			return new Date(parseInt(values[this.yearIndex], 10), values[this.monthIndex], parseInt(values[this.dayIndex], 10));
		},
		
		/**
		 * @method validate
		 */
		validate: function () {
			
			var val = this.getValue();
			
			// empty field
			if (val === '') {
				// validate only if not required
				return !this.options.required;
			}
			
			// val is :
			//  -> a Date, when valid
			//  -> an Invalid Date (== "Invalid Date"), when invalid on FF
			//  -> NaN, when invalid on IE
			//
			// These 3 cases would pass the "val instanceof Date" test,
			// but last 2 cases return NaN on val.getDate(), so "isFinite" test fails.
			return (val instanceof Date && lang.isNumber(val.getTime()));
		}
		
	});
	
	// Register this class as "dateselectmonth" type
	inputEx.registerType("dateselectmonth", inputEx.DateSelectMonthField);


}, '@VERSION@', {
    "requires": [
        "inputex-combine",
        "inputex-string",
        "inputex-select"
    ],
    "ix_provides": "dateselectmonth",
    "lang": [
        "en",
        "fr",
        "de",
        "ca",
        "es",
        "fr",
        "it",
        "nl"
    ]
});
