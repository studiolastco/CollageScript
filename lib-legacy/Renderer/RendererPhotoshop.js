function RendererPhotoshop() {
    Renderer.call(this);

    this.resolution;
    this.bitDepth;
    this.documentMode;
    this.documentFill;
    this.colorProfile;

    this.validOptions.push(
        "groupLayers",
        "layerGroupReference",
        "layerPlacement"
    );
    this.setOption("groupLayers", Boolean(false));
    this.setOption("layerPlacement", ElementPlacement.PLACEATEND);
}

RendererPhotoshop.prototype = new Renderer();
RendererPhotoshop.prototype.constructor = RendererPhotoshop;

RendererPhotoshop.prototype.getCanvas = function() {
    return this.canvas;
};

RendererPhotoshop.prototype.setCanvas = function(canvas) {
    if (!(canvas instanceof Document)) {
        throw new CollageException(
            "Canvas argument does not appear to be a reference to PS document."
        );
    }
    this.canvas = canvas;
};

RendererPhotoshop.prototype.getApplicationUnitsString = function() {
    var tmp = this.getApplicationUnits()
        .toString()
        .split(".");
    return tmp[1].toLowerCase();
};

RendererPhotoshop.prototype.getApplicationUnits = function() {
    return app.preferences.rulerUnits;
};

RendererPhotoshop.prototype.setApplicationUnits = function(appUnits) {
    if (
        typeof appUnits == "undefined" ||
        !this.getConfig().VALID_APPLICATIONUNITS.inArray(appUnits)
    ) {
        CSGlobal.csDebug(
            2,
            "Setting default application units: " +
                this.getConfig().DEFAULT_APPLICATIONUNITS
        );
        CSGlobal.csDebug(
            2,
            "Application units: " + this.getApplicationUnitsString()
        );
        app.preferences.rulerUnits = this.getConfig().DEFAULT_APPLICATIONUNITS;
    } else {
        CSGlobal.csDebug(2, "Setting application units: " + appUnits);
        CSGlobal.csDebug(
            2,
            "Application units: " + this.getApplicationUnitsString()
        );
        app.preferences.rulerUnits = appUnits;
    }
};

RendererPhotoshop.prototype.validUnits = function(units) {
    // CM INCHES MM PERCENT PICAS PIXELS POINTS (p 214)
    var valid = new Array(
        Units.CM,
        Units.INCHES,
        Units.MM,
        Units.PERCENT,
        Units.PICAS,
        Units.PIXELS,
        Units.POINTS
    );
    var test = valid.indexOf(units);
    if (test == -1) {
        return false;
    } else {
        return true;
    }
};

/* Debug Level
Javascript Tools Guide CS6.pdf, page 217
0: No debugging
1: Break on runtime errors
2: Full debug mode
*/
RendererPhotoshop.prototype.csDebug = function(debugLevel, msg) {
    if (
        this.getConfig().VALID_DEBUGLEVEL.inArray(debugLevel) &&
        debugLevel <= this.getDebugLevel()
    ) {
        $.writeln(msg);
    }
};

RendererPhotoshop.prototype.getDebugLevel = function() {
    return $.level;
};

RendererPhotoshop.prototype.setDebugLevel = function(debugLevel) {
    if (
        typeof debugLevel == "undefined" ||
        !this.getConfig().VALID_DEBUGLEVEL.inArray(debugLevel)
    ) {
        CSGlobal.csDebug(
            2,
            "Setting default debug level: " +
                this.getConfig().DEFAULT_DEBUGLEVEL
        );
        $.level = this.getConfig().DEFAULT_DEBUGLEVEL;
    } else {
        CSGlobal.csDebug(2, "Setting debug level: " + debugLevel);
        $.level = debugLevel;
    }
};

RendererPhotoshop.prototype.addDocumentInfo = function(additionalProperties) {
    if (additionalProperties.constructor == Array) {
        return this.getDocumentInfo().addProperties(additionalProperties);
    }
};

RendererPhotoshop.prototype.getDocumentInfo = function() {
    return this.documentInfo;
};

RendererPhotoshop.prototype.getEnableNotifiers = function() {
    return app.notifiersEnabled;
};

RendererPhotoshop.prototype.setEnableNotifiers = function(enableNotifiers) {
    if (
        typeof enableNotifiers == "undefined" ||
        enableNotifiers.constructor != Boolean
    ) {
        CSGlobal.csDebug(
            2,
            "Setting default enable notifiers: " +
                this.getConfig().DEFAULT_ENABLENOTIFIER
        );
        app.notifiersEnabled = this.getConfig().DEFAULT_ENABLENOTIFIER;
    } else {
        CSGlobal.csDebug(2, "Setting enable notifiers: " + enableNotifiers);
        app.notifiersEnabled = enableNotifiers;
    }
};

RendererPhotoshop.prototype.initCanvas = function(canvas) {
    CSGlobal.csDebug(1, "INIT Canvas: RendererPhotoshop");

    canvas.canvasFile = new File(canvas.getCanvasRoot() + "/" + canvas.name);
    /* Is it saved in filesystem? */
    if (canvas.canvasFile.exists) {
        CSGlobal.csDebug(
            1,
            "Init'ing canvas reference by opening existing canvas from filesystem: " +
                canvas.name
        );
        canvas.canvasReference = app.open(canvas.canvasFile);
        canvas.setCanvas(canvas.canvasReference);
    } else {
        /* Look through open documents...that haven't been saved yet...maybe... */
        for (var j = 0; j < app.documents.length; j++) {
            if (app.documents[j].name == canvas.name) {
                CSGlobal.csDebug(
                    1,
                    "Init'ing canvas using file already open: " + canvas.name
                );
                canvas.canvasReference = app.documents[j];
                canvas.setCanvas(canvas.canvasReference);
            }
        }
    }

    if (typeof canvas.canvasReference == "undefined") {
        /* Create new canvas (file) */
        if (canvas.getWidth().constructor != UnitValue) {
            throw new CollageException(
                "Canvas width does not appear to be set."
            );
        }

        if (canvas.getHeight().constructor != UnitValue) {
            throw new CollageException(
                "Canvas height does not appear to be set."
            );
        }

        /* Resolution */
        this.setResolution(this.getResolution());

        /* Document Mode */
        this.setDocumentMode();

        /* Document Fill, null since ExtendScript has issue with its own constant values */
        this.setDocumentFill();

        /* Bit Depth */
        this.setBitDepth();

        /* Color profile type */
        this.setColorProfileType();

        CSGlobal.csDebug(
            1,
            "Init'ing canvas by creating new file: " + canvas.name
        );
        canvas.canvasReference = app.documents.add(
            canvas.getWidth(),
            canvas.getHeight(),
            this.getResolution(),
            canvas.getName(),
            this.getDocumentMode(),
            this.getDocumentFill(),
            this.getAspectRatio(),
            this.getBitDepth(),
            this.getColorProfileType()
        );
    }

    /* Add reference to renderer */
    this.setCanvas(canvas.canvasReference);

    //canvas.documentInfo = new CSDocumentInfo(canvas);
    //canvas.addDocumentInfo(Canvas.INSTRUCTIONS);
    //this.addDocumentInfo(CanvasGrid.INSTRUCTIONS);
    //this.getDocumentInfo().confirmSet();

    return this.getCanvas();
};

RendererPhotoshop.prototype.setWidth = function(width) {
    if (width.constructor == UnitValue) {
        CSGlobal.csDebug(
            1,
            "Setting canvas width: " + width.value + " " + width.type
        );
        return this.setOption("width", width);
    } else if (width.constructor == Number) {
        CSGlobal.csDebug(
            1,
            "Setting canvas width with default units " +
                this.getConfig().DEFAULT_APPLICATIONUNITSTRING +
                ": " +
                width
        );
        return this.setOption(
            "width",
            UnitValue(
                new Number(width),
                this.getConfig().DEFAULT_APPLICATIONUNITSTRING
            )
        );
    } else {
        throw new CollageException("Canvas width must be a UnitValue object.");
        return false;
    }
};

RendererPhotoshop.prototype.setHeight = function(height) {
    if (height.constructor == UnitValue) {
        CSGlobal.csDebug(
            1,
            "Setting canvas height: " + height.value + " " + height.type
        );
        return this.setOption("height", height);
    } else if (height.constructor == Number) {
        CSGlobal.csDebug(
            1,
            "Setting canvas height with default units " +
                this.getConfig().DEFAULT_APPLICATIONUNITSTRING +
                ": " +
                height
        );
        return this.setOption(
            "height",
            UnitValue(
                new Number(height),
                this.getConfig().DEFAULT_APPLICATIONUNITSTRING
            )
        );
    } else {
        throw new CollageException("Canvas height must be a UnitValue object.");
        return false;
    }
};

RendererPhotoshop.prototype.getResolution = function() {
    return this.resolution;
};

/* CS6 Javascript Reference, page 70, says it must be set in pixels per inch */
RendererPhotoshop.prototype.setResolution = function(resolution) {
    if (resolution < this.getConfig().DEFAULT_RESOLUTION) {
        CSGlobal.csDebug(
            1,
            "Setting default resolution: " + this.getConfig().DEFAULT_RESOLUTION
        );
        this.resolution = this.getConfig().DEFAULT_RESOLUTION;
    } else {
        CSGlobal.csDebug(1, "Setting resolution: " + resolution);
        this.resolution = resolution;
    }
};

RendererPhotoshop.prototype.getDocumentMode = function() {
    return this.documentMode;
};

RendererPhotoshop.prototype.setDocumentMode = function(documentMode) {
    if (!this.validDocumentMode(documentMode)) {
        CSGlobal.csDebug(
            1,
            "Setting default documentMode: " +
                this.getConfig().DEFAULT_DOCUMENTMODE
        );
        this.documentMode = this.getConfig().DEFAULT_DOCUMENTMODE;
    } else {
        CSGlobal.csDebug(1, "Setting documentMode: " + documentMode);
        this.documentMode = documentMode;
    }
};

RendererPhotoshop.prototype.validDocumentMode = function(documentMode) {
    /* BITMAP CMYK DUOTONE GRAYSCALE INDEXEDCOLOR LAB MULTICHANNEL RGB (p 202) */
    var valid = new Array(DocumentMode.RGB, DocumentMode.GRAYSCALE);
    var test = valid.indexOf(documentMode);
    if (test == -1) {
        return false;
    } else {
        return true;
    }
};

RendererPhotoshop.prototype.getDocumentFill = function() {
    return this.documentFill;
};

RendererPhotoshop.prototype.setDocumentFill = function(documentFill) {
    if (!this.validDocumentFill(documentFill)) {
        CSGlobal.csDebug(
            1,
            "Setting default documentFill: " +
                this.getConfig().DEFAULT_DOCUMENTFILL
        );
        this.documentFill = this.getConfig().DEFAULT_DOCUMENTFILL;
    } else {
        CSGlobal.csDebug(1, "Setting documentFill: " + documentFill);
        this.documentFill = documentFill;
    }
};

RendererPhotoshop.prototype.validDocumentFill = function(documentFill) {
    /* BACKGROUNDCOLOR TRANSPARENT WHITE (p 202) */
    var valid = new Array(
        DocumentFill.BACKGROUNDCOLOR,
        DocumentFill.TRANSPARENT,
        DocumentFill.WHITE
    );
    var test = valid.indexOf(documentFill);
    if (test == -1) {
        return false;
    } else {
        return true;
    }
};

RendererPhotoshop.prototype.getAspectRatio = function() {
    /* Square pixels */
    return 1;
};

RendererPhotoshop.prototype.validBitDepth = function(bitDepth) {
    /* EIGHT ONE SIXTEEN THIRTYTWO (p 198) */
    var valid = new Array(
        BitsPerChannelType.EIGHT,
        BitsPerChannelType.ONE,
        BitsPerChannelType.SIXTEEN
    );
    var test = valid.indexOf(bitDepth);
    if (test == -1) {
        return false;
    } else {
        return true;
    }
};

RendererPhotoshop.prototype.getBitDepth = function() {
    return this.bitDepth;
};

RendererPhotoshop.prototype.setBitDepth = function(bitDepth) {
    if (!this.validBitDepth(bitDepth)) {
        CSGlobal.csDebug(
            1,
            "Setting default bitDepth: " + this.getConfig().DEFAULT_BITDEPTH
        );
        this.bitDepth = this.getConfig().DEFAULT_BITDEPTH;
    } else {
        CSGlobal.csDebug(1, "Setting bitDepth: " + bitDepth);
        this.bitDepth = bitDepth;
    }
};

RendererPhotoshop.prototype.validColorProfileType = function(colorProfile) {
    /* CUSTOM NONE WORKING (p 200) */
    var valid = new Array(ColorProfile.WORKING);
    var test = valid.indexOf(colorProfile);
    if (test == -1) {
        return false;
    } else {
        return true;
    }
};

RendererPhotoshop.prototype.getColorProfileType = function() {
    return this.colorProfile;
};

RendererPhotoshop.prototype.setColorProfileType = function(colorProfile) {
    if (!this.validColorProfileType(colorProfile)) {
        CSGlobal.csDebug(
            1,
            "Setting default colorProfile: " +
                this.getConfig().DEFAULT_COLORPROFILETYPE
        );
        this.colorProfile = this.getConfig().DEFAULT_COLORPROFILETYPE;
    } else {
        CSGlobal.csDebug(1, "Setting colorProfile: " + colorProfile);
        this.colorProfile = colorProfile;
    }
};

RendererPhotoshop.prototype.addGuideVertical = function(guide) {
    if (guide.constructor == UnitValue && guide > 0) {
        CSGlobal.csDebug(2, "Canvas addGuideVertical: " + guide);
        return this.getCanvas().guides.add(Direction.VERTICAL, guide);
    } else if (guide.constructor == Number && guide > 0) {
        CSGlobal.csDebug(2, "Canvas addGuideVertical: " + guide);
        return this.getCanvas().guides.add(
            Direction.VERTICAL,
            new UnitValue(guide, this.getUnits())
        );
    } else {
        return false;
    }
};

RendererPhotoshop.prototype.strokeGuideVertical = function(guide) {
    if (guide.constructor == UnitValue && guide > 0) {
        CSGlobal.csDebug(2, "Canvas strokeGuideVertical: " + guide);
        var gridline = new CSLine();
        gridline.setBeginCoordinate(new Coordinate(guide.value, 0));
        gridline.setEndCoordinate(
            new Coordinate(guide.value, this.getOption("height"))
        );
        var p = this.getCanvas().pathItems.add("pathGuide-" + guide.value, [
            gridline.getPath()
        ]);
        if (p) {
            p.strokePath(ToolType.PENCIL);
            return true;
        }
    } else if (guide.constructor == Number && guide > 0) {
        CSGlobal.csDebug(2, "Canvas strokeGuideVertical: " + guide);
        var gridline = new CSLine();
        gridline.setBeginCoordinate(new Coordinate(guide, 0));
        gridline.setEndCoordinate(
            new Coordinate(guide, this.getOption("height"))
        );
        var p = this.getCanvas().pathItems.add("pathGuide-" + guide, [
            gridline.getPath()
        ]);
        if (p) {
            p.strokePath(ToolType.PENCIL);
            return true;
        }
    } else {
        return false;
    }
};

RendererPhotoshop.prototype.addGuideHorizontal = function(guide) {
    if (guide.constructor == UnitValue && guide > 0) {
        CSGlobal.csDebug(2, "Canvas addGuideHorizontal: " + guide);
        this.getCanvas().guides.add(Direction.HORIZONTAL, guide);
    } else if (guide.constructor == Number && guide > 0) {
        CSGlobal.csDebug(2, "Canvas addGuideHorizontal: " + guide);
        this.getCanvas().guides.add(
            Direction.HORIZONTAL,
            new UnitValue(guide, this.getUnits())
        );
    } else {
        return false;
    }
};

RendererPhotoshop.prototype.strokeGuideHorizontal = function(guide) {
    if (guide.constructor == UnitValue && guide > 0) {
        CSGlobal.csDebug(2, "Canvas strokeGuideHorizontal: " + guide);
        var gridline = new CSLine();
        gridline.setBeginCoordinate(new Coordinate(0, guide.value));
        gridline.setEndCoordinate(
            new Coordinate(this.getOption("width"), guide.value)
        );
        var p = this.getCanvas().pathItems.add("pathGuide-" + guide.value, [
            gridline.getPath()
        ]);
        if (p) {
            p.strokePath(ToolType.PENCIL);
            return true;
        }
    } else if (guide.constructor == Number && guide > 0) {
        CSGlobal.csDebug(2, "Canvas strokeGuideHorizontal: " + guide);
        var gridline = new CSLine();
        gridline.setBeginCoordinate(new Coordinate(0, guide));
        gridline.setEndCoordinate(
            new Coordinate(this.getOption("width"), guide)
        );
        var p = this.getCanvas().pathItems.add("pathGuide-" + guide, [
            gridline.getPath()
        ]);
        if (p) {
            p.strokePath(ToolType.PENCIL);
            return true;
        }
    } else {
        return false;
    }
};

RendererPhotoshop.prototype.getHorizontalRealestate = function(canvas) {
    // Get horizontal real estate (width minus offset at left and right)
    return canvas.getWidth().value - canvas.getCanvasOffsetX() * 2;
};

RendererPhotoshop.prototype.getVerticalRealestate = function(canvas) {
    // Get vertical real estate (height minus offset at top and bottom)
    return canvas.getHeight().value - canvas.getCanvasOffsetY() * 2;
};

RendererPhotoshop.prototype.translate = function(m, x, y) {
    CSGlobal.csDebug(
        2,
        "Moving fragment to: " + m.constructor.name + ", x:" + x + " y:" + y
    );

    if (!(m instanceof Mark) && !(m instanceof MarkSeries)) {
        throw new CollageException(
            "Mark argument is not a valid Mark or MarkSeries object."
        );
    }

    app.activeDocument = this.getCanvas();
    m.getFragment()
        .getFragmentLayer()
        .translate(x, y);
    m.getFragment().loadBounds();
    return m.fragment;
};

RendererPhotoshop.prototype.centerOverCoordinate = function(m, coordinate) {
    CSGlobal.csDebug(
        2,
        "Centering fragment over coordinate: " + m.constructor.name
    );
    if (!(m instanceof Mark)) {
        throw new CollageException("Mark argument is not a valid Mark object.");
    }
    if (
        typeof coordinate == "undefined" ||
        !(coordinate instanceof Coordinate)
    ) {
        throw new CollageException(
            "Coordinate argument is not a Coordinate object."
        );
    }
    //canvas.translate(this, -(this.getFragment().getProperty('width')/2), -(this.getFragment().getProperty('height')/2));
    var shape = m.getFragment().getFragmentLayer();
    //CSGlobal.csDebug(2,"ummm: " + shape.getBounds().width + " " + shape.x + " " + shape.y + " " + shape.w + " " + shape.h);
    shape.x = shape.x - shape.getBounds().width / 2;
    shape.y = shape.y - shape.getBounds().height / 2;
    return shape;
};

RendererPhotoshop.prototype.toCoordinate = function(m, coordinate) {
    CSGlobal.csDebug(2, "Moving fragment to coordinate: " + m.constructor.name);

    if (!(m instanceof Mark) && !(m instanceof MarkSeries)) {
        throw new CollageException(
            "Mark argument is not a valid Mark or MarkSeries object."
        );
    }

    if (
        typeof coordinate == "undefined" ||
        !(coordinate instanceof Coordinate)
    ) {
        throw new CollageException(
            "Coordinate argument is not a Coordinate object."
        );
    }

    app.activeDocument = this.getCanvas();
    m.getFragment().loadBounds();
    var newx =
        coordinate.getX() -
        m
            .getFragment()
            .getProperty("top")
            .getX();
    var newy =
        coordinate.getY() -
        m
            .getFragment()
            .getProperty("top")
            .getY();
    m.getFragment()
        .getFragmentLayer()
        .translate(newx, newy);
    m.getFragment().loadBounds();
    return m.fragment;
};

RendererPhotoshop.prototype.topLeft = function(mark) {
    CSGlobal.csDebug(
        2,
        "Moving fragment to top left: " + mark.constructor.name
    );

    if (!(mark instanceof Mark) && !(mark instanceof MarkSeries)) {
        throw new CollageException(
            "Mark argument is not a valid Mark or MarkSeries object."
        );
    }

    app.activeDocument = this.getCanvas();
    this.toCoordinate(mark, new Coordinate(0, 0));
    mark.getFragment().loadBounds();
    return mark.getFragment();
};

RendererPhotoshop.prototype.loadKeywords = function(f) {
    if (!(f instanceof Fragment)) {
        throw new CollageException(
            "RendererPhotoshop.loadKeywords: Fragment argument is not a valid fragment object."
        );
    }

    /* CSGlobal.csDebug(2,"Loading fragment keywords."); */
    var keywords = f.getFragmentDocument().info.keywords;
    CSGlobal.csDebug(2, "Keywords: " + keywords);
    /* other keywords beside rotation vars a, cx, and cy? CSLastFragment, etc. */
    for (var j = 0; j < keywords.length; j++) {
        var tmp = keywords[j].split(":");
        switch (tmp[0]) {
            case "name":
                f.fragmentProperties[tmp[0]] = String(tmp[1]);
                break;
            default:
                f.fragmentProperties[tmp[0]] = Number(tmp[1]);
                break;
        }
    }
    return keywords;
};

RendererPhotoshop.prototype.nameFragment = function(m, f, quad) {
    if (!(m instanceof Mark)) {
        throw new CollageException("Mark argument is not a valid Mark object.");
    }

    if (!(f instanceof Fragment)) {
        throw new CollageException(
            "Fragment argument is not a valid Fragment object."
        );
    }

    var layerName =
        this.getConfig().FRAGMENT_LAYERNAME_PREFIX + "-" + f.getLayerName();
    if (typeof quad != "undefined") {
        layerName = layerName + ":quad" + quad;
    }
    return layerName;
};

RendererPhotoshop.prototype.placeFragment = function(mark) {
    if (this.getOption("groupLayers")) {
        if (typeof this.getOption("layerGroupReference") == "undefined") {
            app.activeDocument = this.canvasReference;
            this.setOption(
                "layerGroupReference",
                this.canvasReference.layerSets.add()
            );
            this.getOption("layerGroupReference").move(
                this.canvasReference,
                this.getLayerPlacement()
            );
        }
        app.activeDocument = mark.fragment.getFragmentDocument();
        // Calling duplicate returns reference we need
        mark.fragment.fragment = mark.fragment.fragment.duplicate(
            this.getOption("layerGroupReference"),
            this.getOption("layerPlacement")
        );
    } else {
        // Make opened swatch active
        app.activeDocument = mark.getFragment().getFragmentDocument();

        // Get document name from smob to use as layer name of fragment added to canvas.
        var layerName = mark.getFragment().getFragmentDocument().name;

        // Duplicate fragment layer, add to canvas
        mark.getFragment().setFragmentLayer(
            mark
                .getFragment()
                .getFragmentLayer()
                .duplicate(this.getCanvas(), this.getOption("layerPlacement"))
        );
        app.activeDocument = this.getCanvas();
        mark.getFragment().getFragmentLayer().name =
            this.getConfig().FRAGMENT_LAYERNAME_PREFIX + layerName;
    }
    return mark.getFragment();
};

RendererPhotoshop.prototype.getAssetBounds = function(f) {
    if (!(f instanceof Fragment)) {
        throw new CollageException(
            "RendererPhotoshop.loadBounds: Fragment argument is not an Fragment object."
        );
    }

    /* Get bounds properties from layer */
    /* [left bound x, top bound y, right bound x, bottom bound y] */
    CSGlobal.csDebug(
        2,
        "RendererPhotoshop.getAssetBounds: Loading fragment bounds."
    );
    var g = new Geometry();
    var layerBounds = f
        .getFragmentLayer()
        .bounds.toString()
        .split(",");

    var result = [
        new Number(layerBounds[0]),
        new Number(layerBounds[1]),
        new Number(layerBounds[2]),
        new Number(layerBounds[3])
    ];
    CSGlobal.csDebug(2, "Get asset bounds: " + result);
    return result;
};

RendererPhotoshop.prototype.hide = function(f) {
    if (!(f instanceof Fragment)) {
        throw new CollageException(
            "RendererPhotoshop.hide: Fragment argument is not an Fragment object."
        );
    }

    return (f.getFragmentLayer().visible = false);
};

RendererPhotoshop.prototype.show = function(f) {
    if (!(f instanceof Fragment)) {
        throw new CollageException(
            "RendererPhotoshop.show: Fragment argument is not an Fragment object."
        );
    }

    return (f.getFragmentLayer().visible = true);
};

RendererPhotoshop.prototype.remove = function(f) {
    if (!(f instanceof Fragment)) {
        throw new CollageException(
            "RendererPhotoshop.remove: Fragment argument is not an Fragment object."
        );
    }

    return f.getFragmentLayer().remove();
};

RendererPhotoshop.prototype.rotate = function(f, a) {
    if (!(f instanceof Fragment)) {
        throw new CollageException(
            "Fragment argument is not an Fragment object."
        );
    }

    var shape = f.getFragmentLayer();
    shape.rotate(a);
};

RendererPhotoshop.prototype.writeProperties = function(documentInfo) {
    if (!(documentInfo instanceof CSDocumentInfo)) {
        throw new CollageException(
            "An object of type CSDocumentInfo must be provided to write properties."
        );
    }

    CSGlobal.csDebug(
        2,
        "Writing document info to " +
            this.getCanvas().name +
            " in IPTC metadata field " +
            CSDocumentInfo.IPTCFIELD +
            "."
    );
    var result = [];
    var currentActiveDocumentRef = app.activeDocument;
    app.activeDocument = this.getCanvas();
    for (var prop in documentInfo.properties) {
        if (
            documentInfo.isValidProperty(prop) &&
            documentInfo.getProperty(prop) !== false
        ) {
            var tmpVal =
                new String(prop) +
                CSDocumentInfo.KEYVALUE_SEPARATOR +
                new String(documentInfo.getProperty(prop));
            result.push(tmpVal);
        }
    }

    this.getCanvas().info[CSDocumentInfo.IPTCFIELD] = result.join(
        CSDocumentInfo.PROPERTY_SEPARATOR
    );
    app.activeDocument = currentActiveDocumentRef;
    return true;
};

RendererPhotoshop.prototype.loadProperties = function(documentInfo) {
    if (!(documentInfo instanceof CSDocumentInfo)) {
        throw new CollageException(
            "An object of type CSDocumentInfo must be provided to write properties."
        );
    }

    CSGlobal.csDebug(
        2,
        "Loading document info from IPTC metadata field " +
            CSDocumentInfo.IPTCFIELD +
            " in " +
            this.getCanvas().name +
            "."
    );
    var properties = new String(
        this.getCanvas().info[CSDocumentInfo.IPTCFIELD]
    );
    var props = properties.split(CSDocumentInfo.PROPERTY_SEPARATOR);
    if (props.constructor == Array && props.length > 0) {
        for (var j = 0; j < props.length; j++) {
            var tmp = props[j].split(CSDocumentInfo.KEYVALUE_SEPARATOR);
            documentInfo.setProperty(tmp[0], tmp[1]);
        }
    }
};

RendererPhotoshop.prototype.closeFragment = function(m) {
    CSGlobal.csDebug(2, "Closing fragment: " + m.constructor.name);

    if (!(m instanceof Mark) && !(m instanceof MarkSeries)) {
        throw new CollageException(
            "Mark argument is not a valid Mark or MarkSeries object."
        );
    }

    return m
        .getFragment()
        .getFragmentDocument()
        .close(SaveOptions.DONOTSAVECHANGES);
};

RendererPhotoshop.prototype.crop = function(left, top, right, bottom, angle) {
    if (typeof angle == "undefined" || angle.constructor != Number) {
        angle = 0;
    }

    return this.getCanvas().crop([left, top, right, bottom], angle);
};

RendererPhotoshop.prototype.refreshCanvas = function() {};
