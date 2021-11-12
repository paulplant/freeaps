//enable SMB at night with High Targets and disable after 6am
var nightlySMBHT = true;

//increase insulin output with raising BG
var accelerateUAM = false;
var limit1 = 160;
var factor1 = 1.3;
var limit2 = 190;
var factor2 = 1.5;
var limit3 = 220;
var factor3 = 1.8;
var IOBlimit = 5.5;

//set a percentage profile and disable autosense
var override = false;
var overridevalue = 0.9;

function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
    var hours = clock.getHours();
    var lastGlucose = glucose[0].sgv;
    var lastIOB = iob[0].iob;
    var reason1 = "No UAM acceleration";
    var reason2 = "No override";
	var reasonIOB = ".";
    var reasonSMB = "nightly SMB-Logic disabled"
    var newRatio = autosens.ratio;

    if (nightlySMBHT=true) {
        if (hours >= 0 && hours <= 6) {
            profile.allowSMB_with_high_temptarget = true;
            reasonSMB = "SMB with HT enabled due to nighttime"
            }else{
                profile.allowSMB_with_high_temptarget = false
                reasonSMB = "SMB with HT disabled due to daytime"
            }
        }

    if (accelerateUAM == true) {
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
            reasonIOB = ", SMB disabled with IOB=" + lastIOB;
        }
        reason1 = "Ratio set to " + autosens.ratio + " as last glucose value is " + lastGlucose + reasonIOB
    }

    if (override==true) {
        autosens.ratio = overridevalue;
        reason2 =  "Profile override set to " + autosens.ratio*100+"%";
    }
    return `${reason1}, ${reason2}, ${reasonSMB}`
}
