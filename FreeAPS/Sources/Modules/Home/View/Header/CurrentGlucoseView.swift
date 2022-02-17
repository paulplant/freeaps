import CoreMedia
import SwiftUI

struct CurrentGlucoseView: View {
    @Binding var recentGlucose: BloodGlucose?
    @Binding var delta: Int?
    @Binding var units: GlucoseUnits
    @Binding var eventualBG: Int?
    @Binding var currentISF: Decimal?
    @Binding var alarm: GlucoseAlarm?

    private var glucoseFormatter: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        if units == .mmolL {
            formatter.minimumFractionDigits = 1
            formatter.maximumFractionDigits = 1
        }
        formatter.roundingMode = .halfUp
        return formatter
    }

    private var numberFormatter: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2
        return formatter
    }

    private var deltaFormatter: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2
        formatter.positivePrefix = "+"
        return formatter
    }

    private var dateFormatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter
    }

    var colorOfGlucose: Color {
        guard let recentBG = recentGlucose?.glucose
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

    var minutesAgo: Int {
        let lastGlucoseDateString = recentGlucose.map { dateFormatter.string(from: $0.dateString) } ?? "--"
        let glucoseDate = Date(lastGlucoseDateString) ?? Date()
        let now = Date()
        let diff = Int(glucoseDate.timeIntervalSince1970 - now.timeIntervalSince1970)
        let hoursDiff = diff / 3600
        var minutesDiff = (diff - hoursDiff * 3600) / 60
        minutesDiff.negate() // Remove "-" sign
        return minutesDiff
    }

    func colorOfMinutesAgo(_ minutes: Int) -> Color {
        switch minutes {
        case 0 ... 5:
            return .secondary
        case 6 ... 9:
            return .orange
        default:
            return .red
        }
    }

    var body: some View {
        VStack(alignment: .center, spacing: 7) {
            HStack(alignment: .lastTextBaseline, spacing: 4) {
                Text(
                    recentGlucose?.glucose
                        .map {
                            glucoseFormatter
                                .string(from: Double(units == .mmolL ? $0.asMmolL : Decimal($0)) as NSNumber)! }
                        ?? "--"
                )
                .font(.system(size: 32, weight: .bold))
                .fixedSize()
                // .foregroundColor(colorOfGlucose)
                .foregroundColor(alarm == nil ? colorOfGlucose : .loopRed)
                image.padding(.bottom, 2)

//                if let eventualBG = eventualBG {
//                    if units == .mmolL {
//                        Text(
//                            glucoseFormatter
//                                .string(from: Decimal(eventualBG).asMmolL as NSNumber)!
//                        )
//                        .font(.system(size: 18, weight: .regular)).foregroundColor(.secondary).fixedSize()
//
//                    } else {
//                        Text("\(eventualBG)").font(.system(size: 18, weight: .regular)).foregroundColor(.secondary)
//                            .fixedSize()
//                    }
//                }
                // Spacer()
            } // .padding(.leading, 0)
            HStack(alignment: .lastTextBaseline, spacing: 2) {
                Text(
                    "\(minutesAgo)m "
                ).font(.system(size: 14)).foregroundColor(colorOfMinutesAgo(minutesAgo))
                    .fixedSize()
                Text(
                    delta
                        .map { deltaFormatter.string(from: Double(units == .mmolL ? $0.asMmolL : Decimal($0)) as NSNumber)!
                        } ??
                        "--"
                ).font(.system(size: 14, weight: .bold))
                    .fixedSize()
                Text(
                    NSLocalizedString(" ISF", comment: "current ISF") + ":"
                )
                .foregroundColor(.secondary)
                .font(.system(size: 14))
                .padding(.leading, 6)
                .fixedSize()
                Text(
                    numberFormatter.string(from: (currentISF ?? 0) as NSNumber) ?? "0"
                )
                .font(.system(size: 14, weight: .bold))
                .fixedSize()
            }
        }
    }

    var image: Image {
        guard let direction = recentGlucose?.direction else {
            return Image(systemName: "arrow.left.and.right")
        }

        switch direction {
        case .doubleUp,
             .singleUp,
             .tripleUp:
            return Image(systemName: "arrow.up")
        case .fortyFiveUp:
            return Image(systemName: "arrow.up.right")
        case .flat:
            return Image(systemName: "arrow.forward")
        case .fortyFiveDown:
            return Image(systemName: "arrow.down.forward")
        case .doubleDown,
             .singleDown,
             .tripleDown:
            return Image(systemName: "arrow.down")

        case .none,
             .notComputable,
             .rateOutOfRange:
            return Image(systemName: "arrow.left.and.right")
        }
    }
}
