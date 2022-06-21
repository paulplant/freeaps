import Foundation

struct TDD_averages: JSON, Equatable {
    var average_7days: Decimal
    var past2hoursAverage: Decimal
    var date: Date

    init(
        average_7days: Decimal,
        past2hoursAverage: Decimal,
        date: Date
    ) {
        self.average_7days = average_7days
        self.past2hoursAverage = past2hoursAverage
        self.date = date
    }
}

extension TDD_averages {
    private enum CodingKeys: String, CodingKey {
        case average_7days
        case past2hoursAverage
        case date
    }
}
