# FreeAPS X with aisf

Ivan's tremendous effort with FreeAPS X - supplemented with an adapted oref1 algo that is based on Gerhards work with his German community, especialy Bernd who trials and tweaks all parameters for himself and documents his structured progress quite well. Gerhard's oref adation and lots of documents and simulation programs for Android can be found at: https://github.com/ga-zelle/autoISF

I just tweaked this oref to work with FAX and JonB helped a lot getting all prefs sorted in FAX. The whole algorithm can be found in my oref repo: https://github.com/mountrcg/oref0/tree/xpm2.2
That will be more easy to review as the packeted js-files in FAX are not really readable. And I really suggest to look at the code.

### Java changes in oref for FAX
In order to minimize the js code from oref to use in FAX (if the need should arise) follow hese instructions by nuker:
#### Instructions edit js-files

[freeAPS X original github](https://github.com/ivalkou/freeaps)

[Overview & Onboarding Tips on Loop&Learn](https://www.loopandlearn.org/freeaps-x/)

Clone oref0 to your computer.

## Updated to include dashpod

- replace the Rileylink package to the Loop version of 2 august 2022
- replace the Loopkit package to the Loop version of 2 august 2022
- add the MKRingProgressView from the Loop version of 2 august 2022
- add the OMNIBLE package from the Loop version of 2 august 2022
_ modify the order of compilation for CGMBLEKit (header before compilation)
 
 ## Changes in package 
 
 The only change required is the public access to managedIdentifier for omnipod, medtronic et  dash. Loop doesn't use it but FAX requires it. 


    //public let managerIdentifier: String = "Omnipod-Dash" // use a single token to make parsing log files easier
    
    public static let managerIdentifier = "Omnipod-Dash"
    
    public var managerIdentifier: String {
        return OmniBLEPumpManager.managerIdentifier
    }

 
 ## Changes in freeapsx

 - in info, add the Bundle Display Name used by package 
 - add Bluetooth service state in Services/Bluetooth required by the new version of the package + add this service as a swift injection in APS resolver
 - in Aps manager :
    - Added blueTooth manager
    - modify enactTempBasal to respect the new protocol
    - modify enactBolus to respect the new protocol. The new loopkit requires a new parameter to describe the type of bolus - in FAX defaut to .manualRecommendationAccepted
    - modify the clearBolusReporter to improve the refresh of the state of the pump
 
 - in devicemanager : 
    - Added blueTooth manager
    - change the staticPumpManagerByIdentifier 
    - change the call ensureCurrentPumpData to respect the new version
    - change the result of fetchNewDataIfNeeded 
    - change the PumpManagerDelegate extension 
    - change the alert protocol
    - add OmniBLE config

 - in extension PumpManager
    - change managerIdentifier
    - remove setupViewController extension
    - new settingsViewController 

- in PumpHistoryStorage  
    - remove a ismutable method
 
- Color and UIColor added and LoopUICOloPalette+Default


In the different views : 
- In home view, add Bluetooth 
- in pump config model, change the PumpConfig.StateModel extension 
- add the bluetooth and correct new interfaces in settings pump views
- change the view for settings max basal /bolus in pump 
- Improve the log message in MainStateModel + UserNotificationManager + Router 

In deviceDataManager :
- add the management of the issue alert (lot of changes with the previous version in the alert management by LoopKit) - Send the alert to UNNotification (modify also)


## issues 
- unable to display all the screens when setup a new pump 
- ~~choice of the insulin for the pump.~~ 
- unable to use truetime for NTP sync. Not yet used by Loop 

