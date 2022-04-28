
/*****************************************************************

 Animate javascript class by Peter Bailey - Copyright (c) 2003
 Contact: me@peterbailey.net
 Website: http://www.peterbailey.net/site/dev/jsclasses/

 Main Features:
 -    Animate any absolutely positioned element
 -    MoveTo or MoveBy for explicit control
 -    Time-To-Target movement
 -    Smoothness setting
 -    Command stack for sequential animations

 Compatibility:
 -    Tested on IE6 and Mozilla 1.1
 -    DOM compliant browsers only

 Requires:
 -    Timer class

 Note: This document was created with a tab-spacing of four (4)

 ******************************************************************/
function Animation( oId, timeCode, timeUnit, smoothness )
{
    var smooth = { 'high' : .05, 'medium': .1, 'low': .2 };

    this.elem = ( typeof oId == 'string') ? this.elem = document.getElementById( oId ) : oId;
    this.style = ( document.all ) ? this.elem.currentStyle : this.elem.style;
    this.X = parseInt( this.elem.offsetLeft );
    this.Y = parseInt( this.elem.offsetTop );
    this.smoothness = ( smoothness ) ? smooth[smoothness] : .1;
    /*    this.X = parseInt( ( this.style.position == 'relative' ) ? this.style.left : this.elem.offsetLeft );
        this.Y = parseInt( ( this.style.position == 'relative' ) ? this.style.top : this.elem.offsetTop );
        if ( isNaN( this.X ) ) this.X = 0;
        if ( isNaN( this.Y ) ) this.Y = 0;
    */    this.timeCode = timeCode;
    this.timeUnit = timeUnit;
    this.timer = new Timer( this );
    this.count = 0;
    this.playing = false;
}

Animation.prototype.moveBy = function( x, y, timeUnit )
{
    if ( this.playing )
        while( this.playing )
            void(0);
    this.destX = this.X + parseInt( x, 10 );
    this.destY = this.Y + parseInt( y, 10 );
    if ( typeof timeUnit != 'undefined' )
        this.timeUnit = timeUnit;
    this.play();
}

Animation.prototype.moveTo = function( x, y, timeUnit )
{
    this.destX = x;
    this.destY = y;
    if ( typeof timeUnit != 'undefined' )
        this.timeUnit = timeUnit;
    this.play();
}

Animation.prototype.play = function()
{
    this.playing = true;
    this.distanceX = Math.abs( this.destX - this.X );
    this.distanceY = Math.abs( this.destY - this.Y );
    this.distance  = Math.floor( Math.sqrt( Math.pow( this.distanceX, 2 ) + Math.pow( this.distanceY, 2 ) ) );

    switch( this.timeCode )
    {
        case 1: // Move specified distance in timeUnit seconds
        {
            this.steps = this.getSteps();
            this.delay = Math.floor( this.timeUnit / this.steps );
            this.stepX = this.getStep( 'X' );
            this.stepY = this.getStep( 'Y' );
        }
    }
    this.count = 0;
    this.move();
}

Animation.prototype.move = function()
{
    if ( this.count == this.steps )
    {
        this.timer.clearTimeout();
        this.finish();
    }
    else
    {
        this.count++;
        this.place( Math.round( this.X + ( this.stepX * this.count ) ), Math.round( this.Y + ( this.stepY * this.count ) ) );
        this.timer.setTimeout( "move", this.delay );
    }
}

Animation.prototype.place = function( x, y )
{
    this.elem.style.left = x + "px";
    this.elem.style.top  = y + "px";
}

Animation.prototype.addCommand = function( fString )
{
    if ( !this.commandStack )
    {
        this.commandStack   = new Array();
        this.commandStep = 0;
    }
    this.commandStack[this.commandStack.length] = fString;
}

Animation.prototype.getStep = function( axis )
{
    var step = this['distance' + axis] / this.steps;
    return ( this['dest' + axis] < this[axis] ) ? 0-step : step;
}

Animation.prototype.getSteps = function()
{
    return Math.floor( this.distance / ( this.distance * this.smoothness ) );
//    var steps = Math.abs( Math.floor( this.distanceX / ( this.distanceX * this.smoothness ) ) );
//    return ( isNaN( steps ) ) ? Math.abs( Math.floor( this.distanceY / ( this.distanceY * this.smoothness ) ) ) : steps;
}

Animation.prototype.finish = function()
{
    this.elem.style.left = this.destX + "px";
    this.elem.style.top = this.destY + "px";
    this.X = this.elem.offsetLeft;
    this.Y = this.elem.offsetTop;
    this.playing = false;

    if ( Boolean( this.commandStack ) )
    {
        try
        {
            eval( "this. " + this.commandStack[this.commandStep] );
        }
        catch(_)
        {
            eval( this.commandStack[this.commandStep] );
        }
        this.commandStack[this.commandStep++] = null;
    }
}

Animation.prototype.dump = function()
{
    var a = '';
    for ( var i in this )
        if ( typeof this[i] != 'function' ) a += i + ": " + this[i] + "\t" + typeof this[i] + "\n";
    alert( a );
}
