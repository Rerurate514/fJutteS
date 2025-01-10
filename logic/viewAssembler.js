class ViewAssembler {
    assembleView(busStops) {
        let timeline = new TimeTablesWindow(busStops);

        return timeline.view
    }
}
