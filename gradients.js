var carColor = "#e3655b";
var cashColor = "#2ca02c";
var smallColor = "#B04CC8";
var groceryColor = "#fbb02d";
var oneColor = "#abbafc";
var twoColor = "#7485cb";
var threeColor = "#3d509a";
var fourColor = "#061c6a";

var car1Grad = ctrSvg.append("linearGradient")
				.attr("id", "car1Grad")
				.attr("cx", "50%")
				.attr("cy", "50%");
        
				
car1Grad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
car1Grad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", oneColor);

var car2Grad = ctrSvg.append("linearGradient") //background
				.attr("id", "car2Grad")
				.attr("cx", "50%")
				.attr("cy", "50%");
        				
car2Grad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
car2Grad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", twoColor);

var car3Grad = ctrSvg.append("linearGradient") //background
				.attr("id", "car3Grad")
				.attr("cx", "50%")
				.attr("cy", "50%");
        				
car3Grad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
car3Grad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", threeColor);

var car4Grad = ctrSvg.append("linearGradient") //background
				.attr("id", "car4Grad")
				.attr("cx", "50%")
				.attr("cy", "50%");
        				
car4Grad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
car4Grad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", fourColor);

var cargrGrad = ctrSvg.append("linearGradient") //background
				.attr("id", "cargrGrad")
				.attr("cx", "50%")
				.attr("cy", "50%");
        				
cargrGrad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
cargrGrad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", groceryColor);


var carsmGrad = ctrSvg.append("linearGradient") //background
				.attr("id", "carsmGrad")
				.attr("cx", "50%")
				.attr("cy", "50%");
        				
carsmGrad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
carsmGrad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", smallColor);

var cashsmGrad = ctrSvg.append("linearGradient") //background
				.attr("id", "cashsmGrad")
				.attr("cx", "50%")
				.attr("cy", "50%");
        				
cashsmGrad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", cashColor);
cashsmGrad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", smallColor);

var cashgrGrad = ctrSvg.append("linearGradient") //background
        .attr("id", "cashgrGrad")
        .attr("cx", "50%")
        .attr("cy", "50%");
				
cashgrGrad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", cashColor);
cashgrGrad.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", groceryColor);

var car1GradSlot = ctrSvg.append("linearGradient")
        .attr("id", "car1GradSlot")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("gradientTransform", "rotate(90)");
        
				
car1GradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
car1GradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", oneColor);

var car2GradSlot = ctrSvg.append("linearGradient") //background
				.attr("id", "car2GradSlot")
				.attr("cx", "50%")
				.attr("cy", "50%")
                .attr("gradientTransform", "rotate(90)");

        				
car2GradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
car2GradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", twoColor);

var car3GradSlot = ctrSvg.append("linearGradient") //background
				.attr("id", "car3GradSlot")
				.attr("cx", "50%")
				.attr("cy", "50%")
                .attr("gradientTransform", "rotate(90)");

        				
car3GradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
car3GradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", threeColor);

var car4GradSlot = ctrSvg.append("linearGradient") //background
				.attr("id", "car4GradSlot")
				.attr("cx", "50%")
				.attr("cy", "50%")
                .attr("gradientTransform", "rotate(90)");

        				
car4GradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
car4GradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", fourColor);

var cargrGradSlot = ctrSvg.append("linearGradient") //background
				.attr("id", "cargrGradSlot")
				.attr("cx", "50%")
				.attr("cy", "50%")
                .attr("gradientTransform", "rotate(90)");

        				
cargrGradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
cargrGradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", groceryColor);


var carsmGradSlot = ctrSvg.append("linearGradient") //background
				.attr("id", "carsmGradSlot")
				.attr("cx", "50%")
				.attr("cy", "50%")
                .attr("gradientTransform", "rotate(90)");

        				
carsmGradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", carColor);
carsmGradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", smallColor);

var cashsmGradSlot = ctrSvg.append("linearGradient") //background
				.attr("id", "cashsmGradSlot")
				.attr("cx", "50%")
				.attr("cy", "50%")
                .attr("gradientTransform", "rotate(90)");

        				
cashsmGradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", cashColor);
cashsmGradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", smallColor);

var cashgrGradSlot = ctrSvg.append("linearGradient") //background
        .attr("id", "cashgrGradSlot")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("gradientTransform", "rotate(90)");

				
cashgrGradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", cashColor);
cashgrGradSlot.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", groceryColor);