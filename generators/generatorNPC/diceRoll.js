
/* ----------------------------------------------------------------------------
roll();
Author: Jeff Yaus

A dice roll simulator. 

roll(x,y)
  Rolls x dice, each having y sides, and returns the result.
  So roll(3,6) rolls 3d6

roll("xdy")
  Rolls x dice, each having y sides, and returns the result.
  Note: quotes are critical.
  So roll("3d6") rolls 3d6
 
roll(z)
  Rolls 1 die of z sides, and returns the result.
  So roll(20) rolls 1d20

*/

function roll() {
  var numberOfDice = 0;
  var numberOfSides = 0;
  var total = 0;

  if (arguments.length==2) {
    numberOfDice = arguments[0];
    numberOfSides = arguments[1];
  } else if (arguments.length==1) {
    var arg = arguments[0] + "";
    if (arg.indexOf("d") > 0)  {
      numberOfDice = arg.substring(0,arg.indexOf("d"));
      numberOfSides = arg.substr(arg.indexOf("d")+1);
    } else {
      numberOfDice = 1;
      numberOfSides = arguments[0];
    }
  }

  for (i=numberOfDice; i>0; i--) {
    total += Math.floor(Math.random()*numberOfSides) + 1;
  }

  return total;
}