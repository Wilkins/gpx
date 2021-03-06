var GpxFile = require('./gpxfile'),
    GpxRoute = require('./gpxroute'),
    GpxPoint = require('./gpxpoint'),
    GpxTrack = require('./gpxtrack'),
    GpxTrackSegment = require('./gpxtracksegment'),
    helpers = require('./helpers');

var GpxFileBuilder = (function () {
    "use strict";

    var GpxFileBuilder = function (metadata) {
        this.file = new GpxFile(metadata);
    };

    GpxFileBuilder.prototype.setFileInfo = function (metadata) {
        if (metadata) {
            this.file.setProperties(metadata);
        }

        return this;
    };

    GpxFileBuilder.prototype.addTrack = function (info, segments) {
        var track = this.file.add(GpxTrack, info),
            i, k;

        if (segments) {
            segments = helpers.force2d(segments);

            for (i = 0; i < segments.length; i++) {
                var segment = track.add(GpxTrackSegment),
                    points = segments[i];

                for (k = 0; k < points.length; k++) {
                    segment.add(GpxPoint, points[k]);
                }
            }
        }

        return this;
    };

    GpxFileBuilder.prototype.addRoute = function (info, points) {
        var route = this.file.add(GpxRoute, info),
            i;

        if (points) {
            points = [].concat(points);

            for (i = 0; i < points.length; i++) {
                route.add(GpxPoint, points[i]);
            }
        }

        return this;
    };

    GpxFileBuilder.prototype.addWayPoints = function (points) {
        var i;

        points = [].concat(points);

        for (i = 0; i < points.length; i++) {
            this.file.add(GpxPoint, points[i]);
        }

        return this;
    };

    GpxFileBuilder.prototype.xml = function () {
        return this.file.getXml();
    };

    return GpxFileBuilder;
}());

module.exports = GpxFileBuilder;
