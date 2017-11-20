export class DispositionConst {
    public static SUCCESSDESPOS = ['ANSWER', 'TRANSFER', 'ONLINE'];
    public static UNSUCCESSDESPOS = ['BUSY', 'NOANSWER', 'CANCEL', 'CONGESTION', 'CHANUNAVAIL', 'VM', 'VM-SUCCESS'];
    public static  MY_DATE_FORMATS = {
	   parse: {
	       dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
	   },
	   display: {
	       // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
	       dateInput: 'input',
	       monthYearLabel: {year: 'numeric', month: 'short'},
	       dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
	       monthYearA11yLabel: {year: 'numeric', month: 'long'},
	   }
	};
}