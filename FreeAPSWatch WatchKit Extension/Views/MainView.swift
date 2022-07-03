import SwiftDate
import SwiftUI

struct MainView: View {
    private enum Config {
        static let lag: TimeInterval = 30
    }

    @EnvironmentObject var state: WatchStateModel

    @State var isCarbsActive = false
    @State var isTargetsActive = false
    @State var isBolusActive = false

    var body: some View {
        ZStack(alignment: .topLeading) {
            if state.timerDate.timeIntervalSince(state.lastUpdate) > 10 {
                HStack {
                    withAnimation {
                        BlinkingView(count: 5, size: 3)
                            .frame(width: 14, height: 14)
                            .padding(2)
                    }
                    Text("Updating...").font(.caption2).foregroundColor(.secondary)
                }
            }
            VStack {
                header
                Spacer()
                buttons
            }

            if state.isConfirmationViewActive {
                ConfirmationView(success: $state.confirmationSuccess)
                    .background(Rectangle().fill(.black))
            }

            if state.isConfirmationBolusViewActive {
                BolusConfirmationView()
                    .environmentObject(state)
                    .background(Rectangle().fill(.black))
            }
        }
        .frame(maxHeight: .infinity)
        .padding(.horizontal)
        .onReceive(state.timer) { date in
            state.timerDate = date
            state.requestState()
        }
        .onAppear {
            state.requestState()
        }
    }

    var header: some View {
        HStack {
            HStack(alignment: .lastTextBaseline) {
                VStack(alignment: .leading, spacing: 0) {
                    HStack(alignment: .center) {
                        Text(state.glucose).font(.system(size: 50, weight: .medium)).foregroundColor(colorOfGlucose)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                        // .padding(.top, 2)
                        if state.timerDate.timeIntervalSince(state.lastUpdate) > 10 {
                            withAnimation {
                                BlinkingView(count: 8, size: 3)
                                    .frame(width: 25, height: 18)
                                    .padding(.bottom, 15)
                            }
                        }
                        Spacer()
                        Text("TDD").foregroundColor(.insulin).font(.caption).fixedSize()
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                            .padding(.bottom, 6)
                    }
                    HStack {
                        Text(state.delta)
                            .font(.title3)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                        Text(state.trend)
                        Text(state.eventualBG)
                            .font(.caption)
                            .foregroundColor(.gray)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                        Spacer()
                        Text(iobFormatter.string(from: (state.tdd ?? 0) as NSNumber)!).font(.caption).fixedSize()
                            .foregroundColor(.insulin)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                    }
                }
                Spacer()
                VStack(spacing: 6) {
                    HStack {
                        Circle().stroke(color, lineWidth: 7).frame(width: 32, height: 32).padding()
                    }

                    if state.lastLoopDate != nil {
                        Text(timeString).font(.caption).foregroundColor(.gray)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                            .foregroundColor(.secondary)
                        // .padding(.bottom, 4)
                    } else {
                        Text("--").font(.caption).foregroundColor(.gray)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                    }
                }
            }
        } // .padding(.bottom)
    }

    var buttons: some View {
        VStack {
            Spacer()
            HStack(alignment: .lastTextBaseline) {
                Text(iobFormatter.string(from: (state.cob ?? 0) as NSNumber)!).font(.title3).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Text("g").foregroundColor(.loopYellow).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Spacer()
                Text(iobFormatter.string(from: (state.iob ?? 0) as NSNumber)!).font(.title3).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Text("U").foregroundColor(.insulin).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Spacer()
                Text("ISF").foregroundColor(.loopGreen).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Text(iobFormatter.string(from: (state.isf ?? 0) as NSNumber)!).font(.title3).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
            }.padding(.bottom)
            Spacer()
            HStack(alignment: .bottom) {
                NavigationLink(isActive: $state.isCarbsViewActive) {
                    CarbsView()
                        .environmentObject(state)
                } label: {
                    Image("carbs", bundle: nil)
                        .renderingMode(.template)
                        .resizable()
                        .frame(width: 24, height: 24)
                        .foregroundColor(.loopYellow)
                }
                NavigationLink(isActive: $state.isBolusViewActive) {
                    BolusView()
                        .environmentObject(state)
                } label: {
                    Image("bolus", bundle: nil)
                        .renderingMode(.template)
                        .resizable()
                        .frame(width: 24, height: 24)
                        .foregroundColor(.insulin)
                }
                NavigationLink(isActive: $state.isTempTargetViewActive) {
                    TempTargetsView()
                        .environmentObject(state)
                } label: {
                    VStack {
                        Image("target", bundle: nil)
                            .renderingMode(.template)
                            .resizable()
                            .frame(width: 24, height: 24)
                            .foregroundColor(.loopGreen)
                        if let until = state.tempTargets.compactMap(\.until).first, until > Date() {
                            Text(until, style: .relative)
                                .scaledToFill().fixedSize()
                                .font(.system(size: 8))
                        }
                    }
                }
            }
        }
    }

    private var iobFormatter: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.maximumFractionDigits = 2
        formatter.numberStyle = .decimal
        return formatter
    }

    private var timeString: String {
        let minAgo = Int((Date().timeIntervalSince(state.lastLoopDate ?? .distantPast) - Config.lag) / 60) + 1
        if minAgo > 1440 {
            return "--"
        }
        return "\(minAgo) " + NSLocalizedString("min", comment: "Minutes ago since last loop")
    }

    private var colorOfGlucose: Color {
        guard let recentBG = Int(state.glucose)
        else { return .loopYellow }

        switch recentBG {
        case 30 ... 64:
            return .red
        case 65 ... 89:
            return .primary
        case 99 ... 109:
            return .primary
        case 110 ... 199:
            return .primary
        case 200 ... 500:
            return .red
        default:
            return .primary
        }
    }

    private var color: Color {
        guard let lastLoopDate = state.lastLoopDate else {
            return .loopGray
        }
        let delta = Date().timeIntervalSince(lastLoopDate) - Config.lag

        if delta <= 5.minutes.timeInterval {
            return .green
        } else if delta <= 10.minutes.timeInterval {
            return .yellow
        } else {
            return .loopRed
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        let state = WatchStateModel()

        state.glucose = "266"
        state.delta = "+55"
        state.iob = 9.9
        state.cob = 88
        state.isf = 100
        state.tdd = 35.95
        state.eventualBG = "232"

        state.lastLoopDate = Date().addingTimeInterval(-200)
        state
            .tempTargets =
            [TempTargetWatchPreset(name: "Test", id: "test", description: "", until: Date().addingTimeInterval(3600 * 3))]

        return Group {
            MainView().previewDevice("Apple Watch Series 7 - 45mm")
        }.environmentObject(state)
    }
}
