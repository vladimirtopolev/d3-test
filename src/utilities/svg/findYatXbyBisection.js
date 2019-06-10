export default (x, path, error) => {
    var length_end = path.getTotalLength()
        , length_start = 0
        , point = path.getPointAtLength((length_end + length_start) / 2) // get the middle point
        , bisection_iterations_max = 50
        , bisection_iterations = 0

    error = error || 0.01

    while (x < point.x - error || x > point.x + error) {
        // get the middle point
        point = path.getPointAtLength((length_end + length_start) / 2)

        if (x < point.x) {
            length_end = (length_start + length_end) / 2
        } else {
            length_start = (length_start + length_end) / 2
        }

        // Increase iteration
        if (bisection_iterations_max < ++bisection_iterations)
            break;
    }
    return point.y
}
