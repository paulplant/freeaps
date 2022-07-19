var freeaps_determineBasal;(()=>{var e={5546:(e,a,r)=>{var t=r(6880);function o(e,a){a||(a=0);var r=Math.pow(10,a);return Math.round(e*r)/r}function n(e,a){return"mmol/L"===a.out_units?o(e/18,1):Math.round(e)}var i="",s="",l="",u="",m="",d="",c="",g="",f="";function p(e,a){var r=[2,7,12,16,20,50,60,80,90,100,110,150,180,200],t=[0,0,.4,.7,.7,-.5,-.5,-.3,-.2,0,0,.5,.7,.7],o=r.length-1,n=r[0],i=t[0],s=r[o],l=t[o],u=1,m=1,d=1,c=n;if(n>e)u=(m=i)+((l=t[1])-m)/((s=r[1])-(d=n))*(e-d);else if(s<e)u=(m=i=t[o-1])+(l-m)/(s-(d=n=r[o-1]))*(e-d);else for(var g=0;g<=o;g++){if(i=t[g],(n=r[g])==e){u=i;break}if(n>e){u=m+(i-m)/(n-(d=c))*(e-d);break}m=i,c=n}return u*=e>100?a.higher_ISFrange_weight:e>40?a.lower_ISFrange_weight:a.delta_ISFrange_weight}function b(e,a,r){if(void 0===e.smb_delivery_ratio_bg_range||0===e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio set to fixed value "+e.smb_delivery_ratio),e.smb_delivery_ratio;var t=Math.min(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a<=r)return console.error("SMB delivery ratio limited by minimum value "+t),t;var n=Math.max(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a>=r+e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio limited by maximum value "+n),n;var i=t+(n-t)*(a-r)/e.smb_delivery_ratio_bg_range;return console.error("SMB delivery ratio set to interpolated value "+o(i,2)),i}e.exports=function(e,a,r,h,v,_,B,M,y,x,S,w,C,I,F,G){var O,D,T,R,A=0,U="",P=0,j=(I=0,0),k=0,q=0,E=0,W=0;F.length>0&&(W=F[0].TDD);let z=G.avgTDD7d;function L(e,a){var r=e.getTime();return new Date(r+36e5*a)}function N(e){var a=h.bolus_increment;.05!=a&&(a=.1);var r=e/a;return r>=1?o(Math.floor(r)*a,5):0}function Z(e){function a(e){return e<10&&(e="0"+e),e}return a(e.getHours())+":"+a(e.getMinutes())+":00"}function $(e,a){var r=new Date("1/1/1999 "+e),t=new Date("1/1/1999 "+a);return(r.getTime()-t.getTime())/36e5}function H(e,a){var r=0,t=a,o=(e-a)/36e5,n=0,i=o,s=0;do{if(o>0){var l=Z(t);C[0].start;for(let e=0;e<C.length;e++){var u=C[e].start;if(l==u){if(e+1<C.length){o>=(s=$(C[e+1].start,C[e].start))?n=s:o<s&&(n=o)}else if(e+1==C.length){let a=C[0].start;o>=(s=24-$(C[e].start,a))?n=s:o<s&&(n=o)}r+=N(C[e].rate*n),o-=n,t=L(t,n)}else if(l>u)if(e+1<C.length){var m=C[e+1].start;l<m&&(o>=(s=$(m,l))?n=s:o<s&&(n=o),r+=N(C[e].rate*n),o-=n,t=L(t,n))}else if(e==C.length-1){o>=(s=$("23:59:59",l))?n=s:o<s&&(n=o),r+=N(C[e].rate*n),o-=n,t=L(t,n)}}}}while(o>0&&o<i);return r}let J=S.length-1;if(J>=0)var K=new Date(S[J].timestamp);else K=new Date;var Q,V,X=new Date(S[0].timestamp);("TempBasalDuration"==S[0]._type&&(X=new Date),(A=(X-K)/36e5)<23.5)?(q=H(K,(Q=24-A,V=K.getTime(),new Date(V-36e5*Q))),U="24 hours of data is required for an accurate tdd calculation. Currently only "+A.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+q.toPrecision(5)+" U. "):U="";for(let e=0;e<S.length;e++)"Bolus"==S[e]._type&&(k+=S[e].amount);for(let e=1;e<S.length;e++)if("TempBasal"==S[e]._type&&S[e].rate>0){P=e,E=S[e].rate;var Y=S[e-1]["duration (min)"]/60,ee=Y,ae=new Date(S[e-1].timestamp),re=ae;do{if(e--,0==e){re=new Date;break}if("TempBasal"==S[e]._type||"PumpSuspend"==S[e]._type){re=new Date(S[e].timestamp);break}}while(e>0);var te=(re-ae)/36e5;te<ee&&(Y=te),j+=N(E*Y),e=P}for(let e=0;e<S.length;e++)if(0,0==S[e]["duration (min)"]||"PumpResume"==S[e]._type){let a=new Date(S[e].timestamp),r=a,t=e;do{if(t>0&&(--t,"TempBasal"==S[t]._type)){r=new Date(S[t].timestamp);break}}while(t>0);(r-a)/36e5>0&&(q+=H(r,a))}for(let e=S.length-1;e>0;e--)if("TempBasalDuration"==S[e]._type){let a=S[e]["duration (min)"]/60,r=new Date(S[e].timestamp);var oe=r;let t=e;do{if(--t,t>=0&&("TempBasal"==S[t]._type||"PumpSuspend"==S[t]._type)){oe=new Date(S[t].timestamp);break}}while(t>0);if(0==e&&"TempBasalDuration"==S[0]._type&&(oe=new Date,a=S[e]["duration (min)"]/60),(oe-r)/36e5-a>0){q+=H(oe,L(r,a))}}var ne=I=k+j+q;T=". Bolus insulin: "+k.toPrecision(5)+" U",R=". Temporary basal insulin: "+j.toPrecision(5)+" U",D=". Insulin with scheduled basal rate: "+q.toPrecision(5)+" U",O="TDD past 24h is: "+I.toPrecision(5)+" U",logOutPut=U+O+T+R+D,tddReason=", TDD, 24h: "+o(I,1)+", ytd: "+o(W,1)+", 7dØ: "+o(z,1);var ie={},se=new Date;if(x&&(se=x),void 0===h||void 0===h.current_basal)return ie.error="Error: could not get current basal rate",ie;var le=t(h.current_basal,h),ue=le,me=new Date;x&&(me=x);var de,ce=new Date(e.date),ge=o((me-ce)/60/1e3,1),fe=e.glucose,pe=e.noise;de=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var be=Math.min(e.delta,e.short_avgdelta),he=Math.min(e.short_avgdelta,e.long_avgdelta),ve=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(fe<=10||38===fe||pe>=3)&&(ie.reason="CGM is calibrating, in ??? state, or noise is high");if(fe>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(fe,h)+"+"+n(e.delta,h)+") for 5m w/ "+n(e.short_avgdelta,h)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),ge>12||ge<-5?ie.reason="If current system time "+me+" is correct, then BG data is too old. The last BG data was read "+ge+"m ago at "+ce:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?ie.reason="CGM was just calibrated":ie.reason="CGM data is unchanged ("+n(fe,h)+"+"+n(e.delta,h)+") for 5m w/ "+n(e.short_avgdelta,h)+" mg/dL ~15m change & "+n(e.long_avgdelta,h)+" mg/dL ~45m change"),fe<=10||38===fe||pe>=3||ge>12||ge<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return a.rate>=ue?(ie.reason+=". Canceling high temp basal of "+a.rate,ie.deliverAt=se,ie.temp="absolute",ie.duration=0,ie.rate=0,ie):0===a.rate&&a.duration>30?(ie.reason+=". Shortening "+a.duration+"m long zero temp to 30m. ",ie.deliverAt=se,ie.temp="absolute",ie.duration=30,ie.rate=0,ie):(ie.reason+=". Temp "+a.rate+" <= current basal "+ue+"U/hr; doing nothing. ",ie);var _e,Be,Me,ye=h.max_iob;if(void 0!==h.min_bg&&(Be=h.min_bg),void 0!==h.max_bg&&(Me=h.max_bg),void 0===h.min_bg||void 0===h.max_bg)return ie.error="Error: could not determine target_bg. ",ie;_e=(h.min_bg+h.max_bg)/2;var xe=h.exercise_mode||h.high_temptarget_raises_sensitivity,Se=100,we=160;if(h.half_basal_exercise_target&&(we=h.half_basal_exercise_target),xe&&h.temptargetSet&&_e>Se||h.low_temptarget_lowers_sensitivity&&h.temptargetSet&&_e<Se){var Ce=we-Se;Ce+_e-Se>0?(sensitivityRatio=Ce/(Ce+_e-Se),sensitivityRatio=Math.min(sensitivityRatio,h.autosens_max),sensitivityRatio=o(sensitivityRatio,2)):sensitivityRatio=h.autosens_max,process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+_e+"; ")}else void 0!==v&&v&&(sensitivityRatio=v.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(sensitivityRatio&&(ue=h.current_basal*sensitivityRatio,(ue=t(ue,h))!==le?process.stderr.write("Adjusting basal from "+le+" to "+ue+"; "):process.stderr.write("Basal unchanged: "+ue+"; ")),h.temptargetSet);else if(void 0!==v&&v&&(h.sensitivity_raises_target&&v.ratio<1||h.resistance_lowers_target&&v.ratio>1)){Be=o((Be-60)/v.ratio)+60,Me=o((Me-60)/v.ratio)+60;var Ie=o((_e-60)/v.ratio)+60;_e===(Ie=Math.max(80,Ie))?process.stderr.write("target_bg unchanged: "+Ie+"; "):process.stderr.write("target_bg from "+_e+" to "+Ie+"; "),_e=Ie}var Fe=200,Ge=200,Oe=200;if(e.noise>=2){var De=Math.max(1.1,h.noisyCGMTargetMultiplier);Math.min(250,h.maxRaw);Fe=o(Math.min(200,Be*De)),Ge=o(Math.min(200,_e*De)),Oe=o(Math.min(200,Me*De)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+_e+" to "+Ge+"; "),Be=Fe,_e=Ge,Me=Oe}var Te=Be-.5*(Be-40),Re=o(h.sens,1),Ae=h.sens;if(void 0!==v&&v&&((Ae=o(Ae=h.sens/sensitivityRatio,1))!==Re?process.stderr.write("ISF from "+n(Re,h)+" to "+n(Ae,h)):process.stderr.write("ISF unchanged: "+n(Ae,h)),i+="Autosens, Ratio: "+sensitivityRatio+", ISF: "+n(Re,h)+"→"+n(Ae,h)),console.error("CR:"+h.carb_ratio),Ae=function(e,a,r,t,h,v,_,B){if(!r.use_autoisf)return console.error("autoISF disabled in Preferences"),i+=", autoISF, disabled",e;var M=t.dura_p,y=t.delta_pl,x=t.delta_pn,S=t.r_squ,w=t.bg_acceleration,C=t.parabola_fit_a0,I=t.parabola_fit_a1,F=t.parabola_fit_a2,G=t.autoISF_duration,O=t.autoISF_average,D=r.autoisf_max,T=!1,R=1,A=1,U=1,P=a+10-O;if(!(h.mealCOB>0)||r.enableautoisf_with_COB){var j=t.pp_debug;if(d+="BG-accel: "+o(w,3)+", PF-minutes: "+M+", PF-corr: "+o(S,4)+", PF-nextDelta: "+n(x,r)+", PF-lastDelta: "+n(y,r)+", regular Delta: "+n(t.delta,r),console.error(j+d+" , Weights Accel/Brake: "+r.bgAccel_ISF_weight+" / "+r.bgBrake_ISF_weight),r.enable_BG_acceleration){var k=w;if(0!=t.parabola_fit_a2){var q=-I/2/F*5,E=o(C-q*q/25*F,1);(q=o(q,1))<0&&k<0?(f="saw max of "+n(E,r)+", about "+-q+" min ago",console.error("Parabolic fit "+f)):q<0&&k>0?(f="saw min of "+n(E,r)+", about "+-q+" min ago",console.error("Parabolic fit "+f)):q>0&&k<0?(f="predicts max of "+n(E,r)+", in about "+q+"min",console.error("Parabolic fit "+f)):q>0&&k>0&&(f="predicts min of "+n(E,r)+", in about "+q+" min",console.error("Parabolic fit "+f))}var W=S;if(W<=.9)f="acce_ISF by-passed, as correlation, "+o(W,3)+", is too low",console.error("Parabolic fit "+f),c+=", Parabolic Fit, "+f;else{c+=", Parabolic Fit, "+f+", lastΔ: "+n(y,r)+", nextΔ: "+n(x,r)+", Corr "+o(S,3)+", BG-Accel: "+o(k,2);var z=10*(W-.9),L=1,N=1;t.glucose<r.target_bg?k>0?(k>1&&(L=.5),N=r.bgBrake_ISF_weight):k<0&&(N=r.bgAccel_ISF_weight):k<0?N=r.bgBrake_ISF_weight:k>0&&(N=r.bgAccel_ISF_weight),U=1+k*L*N*z,console.error("Original result for acce_ISF: "+o(U,2)),1!=U&&(T=!0,c+=", acce-ISF Ratio: "+o(U,2))}}else console.error("autoISF BG accelertion adaption disabled in Preferences");var Z=b(r,t.glucose,a);i+=", SMB Delivery Ratio:, "+o(Z,2)+c+", autoISF";var $=1+p(100-P,r);console.error("bg_ISF adaptation is "+o($,2)),$<1&&U>1&&(g="bg-ISF adaptation lifted to "+o($*=U,2)+", as BG accelerates already",s="(lifted by "+o(U,2)+")",console.error(g));var H=1;if($<1)return(H=Math.min($,U))<r.autoisf_min&&(g="final ISF factor "+o(H,2)+" limited by autoisf_min "+r.autoisf_min,console.error(g),H=r.autoisf_min),s=" (lmtd.)",earlysens=Math.min(720,o(r.sens/Math.min(B,H),1)),console.error("early Return autoISF:  "+n(earlysens,r)),i+=", bg-ISF Ratio: "+o($,2)+s+", ISF: "+n(earlysens,r),earlysens;$>1&&(T=!0,i+=", bg-ISF Ratio: "+o($,2));var J=t.delta;P>0?console.error("delta_ISF adaptation by-passed as average glucose < "+n(a+10,r)):t.short_avgdelta<0?console.error("delta_ISF adaptation by-passed as no rise or too short lived"):r.enableppisf_always||r.postmeal_ISF_duration>=(v-h.lastCarbTime)/1e3/3600?(R=1+Math.max(0,J*r.postmeal_ISF_weight),console.error("pp_ISF adaptation is "+o(R,2)),u=", pp-ISF Ratio: "+o(R,2),1!=R&&(T=!0)):(A=p(J,r),P>-20&&(A*=.5),A=1+A,console.error("delta_ISF adaptation is "+o(A,2)),m=", Δ-ISF Ratio: "+o(A,2),1!=A&&(T=!0));var K=1,Q=r.autoisf_hourlychange;return h.mealCOB>0&&!r.enableautoisf_with_COB?console.error("dura_ISF by-passed; preferences disabled mealCOB of "+o(h.mealCOB,1)):G<10?console.error("dura_ISF by-passed; BG is only "+G+"m at level "+O):O<=a?console.error("dura_ISF by-passed; avg. glucose "+O+" below target "+n(a,r)):(K+=G/60*(Q/a)*(O-a),T=!0,l=", Duration: "+G+", Avg: "+n(O,r)+", dura-ISF Ratio: "+o(K,2),console.error("dura_ISF  adaptation is "+o(K,2)+" because ISF "+e+" did not do it for "+o(G,1)+"m")),H=1,T?(H=Math.max(K,$,A,U,R),console.error("autoISF adaption ratios:"),console.error("  dura "+o(K,2)),console.error("  bg "+o($,2)),console.error("  delta "+o(A,2)),console.error("  pp "+o(R,2)),console.error("  accel "+o(U,2)),U<1&&(console.error("strongest ISF factor "+o(H,2)+" weakened to "+o(H*U,2)+" as bg decelerates already"),H*=U),H<r.autoisf_min?(console.error("final ISF factor "+o(H,2)+" limited by autoisf_min "+r.autoisf_min),H=r.autoisf_min):H>D&&(console.error("final ISF factor "+o(H,2)+" limited by autoisf_max "+D),H=D),H>=1&&(e=o(r.sens/Math.max(H,B),1)),H<1&&(e=o(r.sens/Math.min(H,B),1))):H=B,i+=u+m+l+", final Ratio: "+o(H,2)+", final ISF: "+n(e,r),console.error("Inside autoISF: Ratio "+o(H,2)+" resulting in "+n(e,r)),e}return console.error("BG dependant autoISF by-passed; preferences disabled mealCOB of "+o(h.mealCOB,1)),i+=", autoISF, disabled with COB",e}(Ae,_e,h,e,_,x,0,sensitivityRatio),void 0===r)return ie.error="Error: iob_data undefined. ",ie;var Ue,Pe=r;if(r.length,r.length>1&&(r=Pe[0]),void 0===r.activity||void 0===r.iob)return ie.error="Error: iob_data missing some property. ",ie;var je=((Ue=void 0!==r.lastTemp?o((new Date(me).getTime()-r.lastTemp.date)/6e4):0)+a.duration)%30;if(console.error("currenttemp:"+a.rate+" lastTempAge:"+Ue+"m, tempModulus:"+je+"m"),ie.temp="absolute",ie.deliverAt=se,M&&a&&r.lastTemp&&a.rate!==r.lastTemp.rate&&Ue>10&&a.duration)return ie.reason="Warning: currenttemp rate "+a.rate+" != lastTemp rate "+r.lastTemp.rate+" from pumphistory; canceling temp",B.setTempBasal(0,0,h,ie,a);if(a&&r.lastTemp&&a.duration>0){var ke=Ue-r.lastTemp.duration;if(ke>5&&Ue>10)return ie.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+ke+"m ago; canceling temp",B.setTempBasal(0,0,h,ie,a)}var qe=o(-r.activity*Ae*5,2),Ee=o(6*(be-qe));Ee<0&&(Ee=o(6*(he-qe)))<0&&(Ee=o(6*(e.long_avgdelta-qe)));var We=fe,ze=(We=r.iob>0?o(fe-r.iob*Ae):o(fe-r.iob*Math.min(Ae,h.sens)))+Ee;if(void 0===ze||isNaN(ze))return ie.error="Error: could not calculate eventualBG. Sensitivity: "+Ae+" Deviation: "+Ee,ie;var Le=function(e,a,r){return o(r+(e-a)/24,1)}(_e,ze,qe);ie={temp:"absolute",bg:fe,tick:de,eventualBG:ze,insulinReq:0,reservoir:y,deliverAt:se,sensitivityRatio};var Ne=[],Ze=[],$e=[],He=[];Ne.push(fe),Ze.push(fe),He.push(fe),$e.push(fe);var Je=function(e,a,r,t){return a?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&t>100?(console.error("SMB disabled due to high temptarget of",t),!1):!0===r.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&r.mealCOB?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of",r.mealCOB),!0):!0===e.enableSMB_after_carbs&&r.carbs?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&t<100?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of",n(t,e)),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(h,M,_,_e),Ke=h.enableUAM,Qe=0,Ve=0;Qe=o(be-qe,1);var Xe=o(be-qe,1);csf=Ae/h.carb_ratio,console.error("profile.sens:"+n(h.sens,h)+", sens:"+n(Ae,h)+", CSF:"+o(csf,1));var Ye=o(30*csf*5/60,1);Qe>Ye&&(console.error("Limiting carb impact from "+Qe+" to "+Ye+"mg/dL/5m (30g/h)"),Qe=Ye);var ea=3;sensitivityRatio&&(ea/=sensitivityRatio);var aa=ea;if(_.carbs){ea=Math.max(ea,_.mealCOB/20);var ra=o((new Date(me).getTime()-_.lastCarbTime)/6e4),ta=(_.carbs-_.mealCOB)/_.carbs;aa=o(aa=ea+1.5*ra/60,1),console.error("Last carbs "+ra+" minutes ago; remainingCATime:"+aa+"hours; "+o(100*ta)+"% carbs absorbed")}var oa=Math.max(0,Qe/5*60*aa/2)/csf,na=90,ia=1;h.remainingCarbsCap&&(na=Math.min(90,h.remainingCarbsCap)),h.remainingCarbsFraction&&(ia=Math.min(1,h.remainingCarbsFraction));var sa=1-ia,la=Math.max(0,_.mealCOB-oa-_.carbs*sa),ua=(la=Math.min(na,la))*csf*5/60/(aa/2),ma=o(_.slopeFromMaxDeviation,2),da=o(_.slopeFromMinDeviation,2),ca=Math.min(ma,-da/3),ga=0;0===Qe?Ve=0:!0===h.floating_carbs?(Ve=Math.min(60*aa/5/2,Math.max(0,_.carbs*csf/Qe)),ga=Math.min(60*aa/5/2,Math.max(0,_.mealCOB*csf/Qe)),_.carbs>0&&(i+=", Floating Carbs:, CID: "+o(Ve,1)+", MealCarbs: "+o(_.carbs,1)+", Not Floating:, CID: "+o(ga,1)+", MealCOB: "+o(_.mealCOB,1),console.error("Floating Carbs CID: "+o(Ve,1)+" / MealCarbs: "+o(_.carbs,1)+" vs. Not Floating:"+o(ga,1)+" / MealCOB:"+o(_.mealCOB,1)))):Ve=Math.min(60*aa/5/2,Math.max(0,_.mealCOB*csf/Qe)),console.error("Carb Impact:"+Qe+"mg/dL per 5m; CI Duration:"+o(5*Ve/60*2,1)+"hours; remaining CI ("+aa/2+"h peak):",o(ua,1)+"mg/dL per 5m");var fa,pa,ba,ha,va,_a=999,Ba=999,Ma=999,ya=fe,xa=999,Sa=999,wa=999,Ca=999,Ia=ze,Fa=fe,Ga=fe,Oa=0,Da=[],Ta=[];try{Pe.forEach((function(e){var a=o(-e.activity*Ae*5,2),r=o(-e.iobWithZeroTemp.activity*Ae*5,2),t=Qe*(1-Math.min(1,Ze.length/12));Ia=Ze[Ze.length-1]+a+t;var n=He[He.length-1]+r,i=Math.max(0,Math.max(0,Qe)*(1-Ne.length/Math.max(2*Ve,1))),s=Math.min(Ne.length,12*aa-Ne.length),l=Math.max(0,s/(aa/2*12)*ua);i+l,Da.push(o(l,0)),Ta.push(o(i,0)),COBpredBG=Ne[Ne.length-1]+a+Math.min(0,t)+i+l;var u=Math.max(0,Xe+$e.length*ca),m=Math.max(0,Xe*(1-$e.length/Math.max(36,1))),d=Math.min(u,m);d>0&&(Oa=o(5*($e.length+1)/60,1)),UAMpredBG=$e[$e.length-1]+a+Math.min(0,t)+d,Ze.length<48&&Ze.push(Ia),Ne.length<48&&Ne.push(COBpredBG),$e.length<48&&$e.push(UAMpredBG),He.length<48&&He.push(n),COBpredBG<xa&&(xa=o(COBpredBG)),UAMpredBG<Sa&&(Sa=o(UAMpredBG)),Ia<wa&&(wa=o(Ia)),n<Ca&&(Ca=o(n));Ze.length>18&&Ia<_a&&(_a=o(Ia)),Ia>Fa&&(Fa=Ia),(Ve||ua>0)&&Ne.length>18&&COBpredBG<Ba&&(Ba=o(COBpredBG)),(Ve||ua>0)&&COBpredBG>Fa&&(Ga=COBpredBG),Ke&&$e.length>12&&UAMpredBG<Ma&&(Ma=o(UAMpredBG)),Ke&&UAMpredBG>Fa&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}_.mealCOB&&(console.error("predCIs (mg/dL/5m):"+Ta.join(" ")),console.error("remainingCIs:      "+Da.join(" "))),ie.predBGs={},Ze.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))}));for(var Ra=Ze.length-1;Ra>12&&Ze[Ra-1]===Ze[Ra];Ra--)Ze.pop();for(ie.predBGs.IOB=Ze,ba=o(Ze[Ze.length-1]),He.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ra=He.length-1;Ra>6&&!(He[Ra-1]>=He[Ra]||He[Ra]<=_e);Ra--)He.pop();if(ie.predBGs.ZT=He,o(He[He.length-1]),_.mealCOB>0&&(Qe>0||ua>0)){for(Ne.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ra=Ne.length-1;Ra>12&&Ne[Ra-1]===Ne[Ra];Ra--)Ne.pop();ie.predBGs.COB=Ne,ha=o(Ne[Ne.length-1]),ze=Math.max(ze,o(Ne[Ne.length-1]))}if(Qe>0||ua>0){if(Ke){for($e.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ra=$e.length-1;Ra>12&&$e[Ra-1]===$e[Ra];Ra--)$e.pop();ie.predBGs.UAM=$e,va=o($e[$e.length-1]),$e[$e.length-1]&&(ze=Math.max(ze,o($e[$e.length-1])))}ie.eventualBG=ze}console.error("UAM Impact:"+Xe+"mg/dL per 5m; UAM Duration:"+Oa+"hours"),_a=Math.max(39,_a),Ba=Math.max(39,Ba),Ma=Math.max(39,Ma),fa=o(_a);var Aa=_.mealCOB/_.carbs;pa=o(Ma<999&&Ba<999?(1-Aa)*UAMpredBG+Aa*COBpredBG:Ba<999?(Ia+COBpredBG)/2:Ma<999?(Ia+UAMpredBG)/2:Ia),Ca>pa&&(pa=Ca),ya=o(ya=Ve||ua>0?Ke?Aa*xa+(1-Aa)*Sa:xa:Ke?Sa:wa);var Ua=Ma;if(Ca<Te)Ua=(Ma+Ca)/2;else if(Ca<_e){var Pa=(Ca-Te)/(_e-Te);Ua=(Ma+(Ma*Pa+Ca*(1-Pa)))/2}else Ca>Ma&&(Ua=(Ma+Ca)/2);if(Ua=o(Ua),_.carbs)if(!Ke&&Ba<999)fa=o(Math.max(_a,Ba));else if(Ba<999){var ja=Aa*Ba+(1-Aa)*Ua;fa=o(Math.max(_a,Ba,ja))}else fa=Ke?Ua:ya;else Ke&&(fa=o(Math.max(_a,Ua)));fa=Math.min(fa,pa),process.stderr.write("minPredBG: "+fa+" minIOBPredBG: "+_a+" minZTGuardBG: "+Ca),Ba<999&&process.stderr.write(" minCOBPredBG: "+Ba),Ma<999&&process.stderr.write(" minUAMPredBG: "+Ma),console.error(" avgPredBG:"+pa+" COB/Carbs:"+_.mealCOB+"/"+_.carbs),Ga>fe&&(fa=Math.min(fa,Ga)),ie.COB=_.mealCOB,ie.IOB=r.iob,ie.BGI=n(qe,h),ie.deviation=n(Ee,h),ie.ISF=n(Ae,h),ie.CR=o(h.carb_ratio,2),ie.TDD=o(ne,2),ie.target_bg=n(_e,h),ie.reason=i+", Standard, COB: "+ie.COB+", Dev: "+ie.deviation+", BGI: "+ie.BGI+", CR: "+ie.CR+", Target: "+ie.target_bg+", minPredBG "+n(fa,h)+", minGuardBG "+n(ya,h)+", IOBpredBG "+n(ba,h),ha>0&&(ie.reason+=", COBpredBG "+n(ha,h)),va>0&&(ie.reason+=", UAMpredBG "+n(va,h)),ie.reason+=tddReason,ie.reason+="; ";var ka=We;ka<40&&(ka=Math.min(ya,ka));var qa,Ea=Te-ka,Wa=240,za=240;if(_.mealCOB>0&&(Qe>0||ua>0)){for(Ra=0;Ra<Ne.length;Ra++)if(Ne[Ra]<Be){Wa=5*Ra;break}for(Ra=0;Ra<Ne.length;Ra++)if(Ne[Ra]<Te){za=5*Ra;break}}else{for(Ra=0;Ra<Ze.length;Ra++)if(Ze[Ra]<Be){Wa=5*Ra;break}for(Ra=0;Ra<Ze.length;Ra++)if(Ze[Ra]<Te){za=5*Ra;break}}Je&&ya<Te&&(console.error("minGuardBG "+n(ya,h)+" projected below "+n(Te,h)+" - disabling SMB"),Je=!1),void 0===h.maxDelta_bg_threshold&&(qa=.2),void 0!==h.maxDelta_bg_threshold&&(qa=Math.min(h.maxDelta_bg_threshold,.4)),ve>qa*fe&&(console.error("maxDelta "+n(ve,h)+" > "+100*qa+"% of BG "+n(fe,h)+" - disabling SMB"),ie.reason+="maxDelta "+n(ve,h)+" > "+100*qa+"% of BG "+n(fe,h)+" - SMB disabled!, ",Je=!1),console.error("BG projected to remain above "+n(Be,h)+" for "+Wa+"minutes"),(za<240||Wa<60)&&console.error("BG projected to remain above "+n(Te,h)+" for "+za+"minutes");var La=za,Na=h.current_basal*Ae*La/60,Za=Math.max(0,_.mealCOB-.25*_.carbs),$a=(Ea-Na)/csf-Za;Na=o(Na),$a=o($a),console.error("naive_eventualBG:"+We+" bgUndershoot:"+Ea+" zeroTempDuration:"+La+" zeroTempEffect:"+Na+" carbsReq:"+$a),$a>=h.carbsReqThreshold&&za<=45&&(ie.carbsReq=$a,ie.reason+=$a+" add'l carbs req w/in "+za+"m; ");var Ha=0;if(fe<Te&&r.iob<20*-h.current_basal/60&&be>0&&be>Le)ie.reason+="IOB "+r.iob+" < "+o(20*-h.current_basal/60,2),ie.reason+=" and minDelta "+n(be,h)+" > expectedDelta "+n(Le,h)+"; ";else if(fe<Te||ya<Te)return ie.reason+="minGuardBG "+n(ya,h)+"<"+n(Te,h),Ha=o(60*((Ea=_e-ya)/Ae)/h.current_basal),Ha=30*o(Ha/30),Ha=Math.min(120,Math.max(30,Ha)),B.setTempBasal(0,Ha,h,ie,a);if(h.skip_neutral_temps&&ie.deliverAt.getMinutes()>=55)return ie.reason+="; Canceling temp at "+ie.deliverAt.getMinutes()+"m past the hour. ",B.setTempBasal(0,0,h,ie,a);var Ja=0,Ka=ue;if(ze<Be){if(ie.reason+="Eventual BG "+n(ze,h)+" < "+n(Be,h),be>Le&&be>0&&!$a)return We<40?(ie.reason+=", naive_eventualBG < 40. ",B.setTempBasal(0,30,h,ie,a)):(e.delta>be?ie.reason+=", but Delta "+n(de,h)+" > expectedDelta "+n(Le,h):ie.reason+=", but Min. Delta "+be.toFixed(2)+" > Exp. Delta "+n(Le,h),a.duration>15&&t(ue,h)===t(a.rate,h)?(ie.reason+=", temp "+a.rate+" ~ req "+ue+"U/hr. ",ie):(ie.reason+="; setting current basal of "+ue+" as temp. ",B.setTempBasal(ue,30,h,ie,a)));Ja=o(Ja=2*Math.min(0,(ze-_e)/Ae),2);var Qa=Math.min(0,(We-_e)/Ae);if(Qa=o(Qa,2),be<0&&be>Le)Ja=o(Ja*(be/Le),2);if(Ka=t(Ka=ue+2*Ja,h),a.duration*(a.rate-ue)/60<Math.min(Ja,Qa)-.3*ue)return ie.reason+=", "+a.duration+"m@"+a.rate.toFixed(2)+" is a lot less than needed. ",B.setTempBasal(Ka,30,h,ie,a);if(void 0!==a.rate&&a.duration>5&&Ka>=.8*a.rate)return ie.reason+=", temp "+a.rate+" ~< req "+Ka+"U/hr. ",ie;if(Ka<=0){if((Ha=o(60*((Ea=_e-We)/Ae)/h.current_basal))<0?Ha=0:(Ha=30*o(Ha/30),Ha=Math.min(120,Math.max(0,Ha))),Ha>0)return ie.reason+=", setting "+Ha+"m zero temp. ",B.setTempBasal(Ka,Ha,h,ie,a)}else ie.reason+=", setting "+Ka+"U/hr. ";return B.setTempBasal(Ka,30,h,ie,a)}if(be<Le&&(!M||!Je))return e.delta<be?ie.reason+="Eventual BG "+n(ze,h)+" > "+n(Be,h)+" but Delta "+n(de,h)+" < Exp. Delta "+n(Le,h):ie.reason+="Eventual BG "+n(ze,h)+" > "+n(Be,h)+" but Min. Delta "+be.toFixed(2)+" < Exp. Delta "+n(Le,h),a.duration>15&&t(ue,h)===t(a.rate,h)?(ie.reason+=", temp "+a.rate+" ~ req "+ue+"U/hr. ",ie):(ie.reason+="; setting current basal of "+ue+" as temp. ",B.setTempBasal(ue,30,h,ie,a));if(Math.min(ze,fa)<Me&&(!M||!Je))return ie.reason+=n(ze,h)+"-"+n(fa,h)+" in range: no temp required",a.duration>15&&t(ue,h)===t(a.rate,h)?(ie.reason+=", temp "+a.rate+" ~ req "+ue+"U/hr. ",ie):(ie.reason+="; setting current basal of "+ue+" as temp. ",B.setTempBasal(ue,30,h,ie,a));if(ze>=Me&&(ie.reason+="Eventual BG "+n(ze,h)+" >= "+n(Me,h)+", "),r.iob>ye)return ie.reason+="IOB "+o(r.iob,2)+" > max_iob "+ye,a.duration>15&&t(ue,h)===t(a.rate,h)?(ie.reason+=", temp "+a.rate+" ~ req "+ue+"U/hr. ",ie):(ie.reason+="; setting current basal of "+ue+" as temp. ",B.setTempBasal(ue,30,h,ie,a));(Ja=o((Math.min(fa,ze)-_e)/Ae,2))>ye-r.iob&&(ie.reason+="max_iob "+ye+", ",Ja=ye-r.iob),Ka=t(Ka=ue+2*Ja,h),Ja=o(Ja,3),ie.insulinReq=Ja;var Va=o((new Date(me).getTime()-r.lastBolusTime)/6e4,1);if(M&&Je&&fe>Te){var Xa=o(_.mealCOB/h.carb_ratio,3);if(h.use_autoisf)Ya=h.smb_max_range_extension;else{console.error("autoISF disabled, SMB range extension disabled");var Ya=1}Ya>1&&console.error("SMB max range extended from default by factor "+Ya);var er=0;void 0===h.maxSMBBasalMinutes?(er=o(Ya*h.current_basal*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m")):r.iob>Xa&&r.iob>0?(console.error("IOB",r.iob,"> COB",_.mealCOB+"; mealInsulinReq =",Xa),h.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes:",h.maxUAMSMBBasalMinutes,"profile.current_basal:",h.current_basal),er=o(Ya*h.current_basal*h.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),er=o(30*h.current_basal/60,1))):(console.error("profile.maxSMBBasalMinutes:",h.maxSMBBasalMinutes,"profile.current_basal:",h.current_basal),er=o(Ya*h.current_basal*h.maxSMBBasalMinutes/60,1));var ar=h.bolus_increment,rr=1/ar;if(h.use_autoisf)var tr=b(h,fe,_e);else console.error("autoISF disabled, don't adjust SMB Delivery Ratio"),tr=.5;tr>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(tr,2));var or=Math.min(Ja*tr,er);or=Math.floor(or*rr)/rr,Ha=o(60*((_e-(We+_a)/2)/Ae)/h.current_basal),Ja>0&&or<ar&&(Ha=0);var nr=0;Ha<=0?Ha=0:Ha>=30?(Ha=30*o(Ha/30),Ha=Math.min(60,Math.max(0,Ha))):(nr=o(ue*Ha/30,2),Ha=30),ie.reason+=" insulinReq "+Ja,or>=er&&(ie.reason+="; maxBolus "+er),Ha>0&&(ie.reason+="; setting "+Ha+"m low temp of "+nr+"U/h"),ie.reason+=". ";var ir=3;h.SMBInterval&&(ir=Math.min(10,Math.max(1,h.SMBInterval)));var sr=o(ir-Va,0),lr=o(60*(ir-Va),0)%60;if(console.error("naive_eventualBG",We+",",Ha+"m "+nr+"U/h temp needed; last bolus",Va+"m ago; maxBolus: "+er),Va>ir?or>0&&(ie.units=or,ie.reason+="Microbolusing "+or+"U. "):ie.reason+="Waiting "+sr+"m "+lr+"s to microbolus again. ",Ha>0)return ie.rate=nr,ie.duration=Ha,ie}var ur=B.getMaxSafeBasal(h);return Ka>ur&&(ie.reason+="adj. req. rate: "+Ka+" to maxSafeBasal: "+ur+", ",Ka=t(ur,h)),a.duration*(a.rate-ue)/60>=2*Ja?(ie.reason+=a.duration+"m@"+a.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+Ka+"U/hr. ",B.setTempBasal(Ka,30,h,ie,a)):void 0===a.duration||0===a.duration?(ie.reason+="no temp, setting "+Ka+"U/hr. ",B.setTempBasal(Ka,30,h,ie,a)):a.duration>5&&t(Ka,h)<=t(a.rate,h)?(ie.reason+="temp "+a.rate+" >~ req "+Ka+"U/hr. ",ie):(ie.reason+="temp "+a.rate+"<"+Ka+"U/hr. ",B.setTempBasal(Ka,30,h,ie,a))}},6880:(e,a,r)=>{var t=r(6654);e.exports=function(e,a){var r=20;void 0!==a&&"string"==typeof a.model&&(t(a.model,"54")||t(a.model,"23"))&&(r=40);return e<1?Math.round(e*r)/r:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,a,r)=>{var t=r(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,a){for(var r=-1,t=null==e?0:e.length,o=Array(t);++r<t;)o[r]=a(e[r],r,e);return o}},9750:e=>{e.exports=function(e,a,r){return e==e&&(void 0!==r&&(e=e<=r?e:r),void 0!==a&&(e=e>=a?e:a)),e}},4239:(e,a,r)=>{var t=r(2705),o=r(9607),n=r(2333),i=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},531:(e,a,r)=>{var t=r(2705),o=r(9932),n=r(1469),i=r(3448),s=t?t.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(a){if("string"==typeof a)return a;if(n(a))return o(a,e)+"";if(i(a))return l?l.call(a):"";var r=a+"";return"0"==r&&1/a==-Infinity?"-0":r}},7561:(e,a,r)=>{var t=r(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,a,r)=>{var t="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=t},9607:(e,a,r)=>{var t=r(2705),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=t?t.toStringTag:void 0;e.exports=function(e){var a=n.call(e,s),r=e[s];try{e[s]=void 0;var t=!0}catch(e){}var o=i.call(e);return t&&(a?e[s]=r:delete e[s]),o}},2333:e=>{var a=Object.prototype.toString;e.exports=function(e){return a.call(e)}},5639:(e,a,r)=>{var t=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=t||o||Function("return this")();e.exports=n},7990:e=>{var a=/\s/;e.exports=function(e){for(var r=e.length;r--&&a.test(e.charAt(r)););return r}},6654:(e,a,r)=>{var t=r(9750),o=r(531),n=r(554),i=r(9833);e.exports=function(e,a,r){e=i(e),a=o(a);var s=e.length,l=r=void 0===r?s:t(n(r),0,s);return(r-=a.length)>=0&&e.slice(r,l)==a}},1469:e=>{var a=Array.isArray;e.exports=a},3218:e=>{e.exports=function(e){var a=typeof e;return null!=e&&("object"==a||"function"==a)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,a,r)=>{var t=r(4239),o=r(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,a,r)=>{var t=r(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,a,r)=>{var t=r(8601);e.exports=function(e){var a=t(e),r=a%1;return a==a?r?a-r:a:0}},4841:(e,a,r)=>{var t=r(7561),o=r(3218),n=r(3448),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=o(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var r=s.test(e);return r||l.test(e)?u(e.slice(2),r?2:8):i.test(e)?NaN:+e}},9833:(e,a,r)=>{var t=r(531);e.exports=function(e){return null==e?"":t(e)}}},a={};function r(t){var o=a[t];if(void 0!==o)return o.exports;var n=a[t]={exports:{}};return e[t](n,n.exports,r),n.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var t=r(5546);freeaps_determineBasal=t})();