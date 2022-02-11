function round(value, digits)
{
    if (! digits) { digits = 0; }
    var scale = Math.pow(10, digits);
    return Math.round(value * scale) / scale;
}

function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
	//enable SMB at night with High Targets and disable after 6am
	var nightlySMBHT = true;

	//increase insulin output with raising BG
	var accelerateUAM = false;
	const limit1 = 160;
	const factor1 = 1.1;
	const limit2 = 190;
	const factor2 = 1.3;
	const limit3 = 220;
	const factor3 = 1.4;
	const IOBlimit = 6.5;

	//set a percentage profile
	var override = false;
	const overridevalue = 0.8;

	//do Spocks magic formula
	var spock = true;
	const TDD = 45;
	const minRatioLimit = profile.autosens_min;
	const maxRatioLimit = profile.autosens_max;

	//--------------------------------------------
    const hours = clock.getHours();
    const lastGlucose = glucose[0].sgv;
    const lastIOB = iob[0].iob;
    var reason1 = "No UAM acceleration. ";
    var reason2 = "No override. ";
	var reasonIOB = "IOB is in bounds";
    var reasonSMB = "Nightly SMB-Logic disabled. ";
	var reasonSpock = "Spock is off. ";
	var reasonSports  = "";
    var newRatio = autosens.ratio;
    var overrideRatio = newRatio;

	// Turn off AutoISF when using a exercise mode and a high target
	var high_temptarget_raises_sensitivity = profile.exercise_mode || profile.high_temptarget_raises_sensitivity;
	if (high_temptarget_raises_sensitivity && profile.temptargetSet && profile.min_bg > 110) {
		profile.use_autoisf = false;
		reasonSports = "autoISF off due to Exercise Target. ";
		spock = false;
		reasonSpock = "Spock's magic off due to High Target. ";
	}

	// Turn SMB`s with High targets on during nights
    if (nightlySMBHT=true) {
        if (hours >= 0 && hours <= 6) {
            profile.allowSMB_with_high_temptarget = true;
            reasonSMB = "SMB with HT enabled due to nighttime. "
            }else{
                profile.allowSMB_with_high_temptarget = false
                reasonSMB = "SMB with HT disabled due to daytime. "
            }
        }

    if (accelerateUAM == true && hours >= 6 && hours <= 23) {
        if (lastGlucose > limit3) {
            newRatio = autosens.ratio * factor3;
        }else{
            if (lastGlucose > limit2) {
                newRatio = autosens.ratio * factor2;
                }else{
                if (lastGlucose > limit1) {
                    newRatio = autosens.ratio * factor1;
                }
            }
          }
        autosens.ratio = newRatio;
        if (lastIOB > IOBlimit) {
            profile.enableSMB_always = false;
            reasonIOB = ", SMB disabled with IOB=" + lastIOB + ". ";
        }
        reason1 = "Ratio set to " + autosens.ratio + " as last glucose value is " + lastGlucose + ". "+ reasonIOB + "."
    }

    if (override==true) {
        overrideRatio = overridevalue;
        autosens.ratio = overrideRatio;
        reason2 =  "Profile override set to " + autosens.ratio*100+"%.";
    }

  	if (spock==true) {
		SpockRatio = profile.sens / (277700 / (TDD * lastGlucose));
		if (SpockRatio > maxRatioLimit) {
			SpockRatio = maxRatioLimit;
			reasonSpock = "Spock's magic hit limit by autosens_max setting: " + maxRatioLimit;
		}
		if (SpockRatio < minRatioLimit) {
			SpockRatio = minRatioLimit;
			reasonSpock = "Spock's magic hit limit by autosens_min setting: " + minRatioLimit;
		}
		autosens.ratio = round(SpockRatio,3);
		reasonSpock = "Spock's Ratio @ " + round(SpockRatio,3) + " with ISF:"  + round(profile.sens/SpockRatio,0);
	}
	return `${reasonSports} ${reason1} ${reason2} ${reasonSMB} ${reasonSpock}`
}
