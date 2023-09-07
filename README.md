# ColorTinter

### Why did i build it?
[Color Tinter](https://color-tinter.web.app/) is a project i started because i didnt really find a color "picker" that returned an entire spectrum of colors in the way that Color Tinter does.

I also wanted to learn more about how colors work, what are they actually made up of and how and why do they fit together.

## What exactly is Color Tinter?

Color Tinter is a color tool mainly diracted towards frontend developers. It takes a color as the input and the return to the users a wide variety of different color spectrums. The color can be copied by clicking it but what makes Color Tinter different is its ability to return a copyable text of the entire spectrum wich can be changed from CSS variable to SCSS variables or an array with the colors in string format.

## Color manipulation

Colors on the web can be represented by a veriety of codes. For example RGB or HEX which both uses different values of Red, Green and Blue to display the color. 

Color Tinter uses mainly HSL that stands for Hue, Saturation and Lightness. 

Hue changes the base color using degrees of a color wheel.

Saturation is the amount of gray that is added to a color, measured in procentages where 100% is the most saturated version of the color and 0% is a shade of gray.

Lightness like saturation uses preocenteges and declares how bright the color should appear, 100% is white and 0% is black.

### Tints

Tinting a color means to increase its lightness value. 

![](https://github.com/gustav-evensson/color-tinter-2.0/blob/main/images/tints.png)

### Shades

Shades are to opposite of tints which means it decreases the lightness value.

![](https://github.com/gustav-evensson/color-tinter-2.0/blob/main/images/shades.png)

### Tones 

Tones uses the saturation value that makes the color lose its intensity and makes it more gray.

![](https://github.com/gustav-evensson/color-tinter-2.0/blob/main/images/tones.png)

### Combination

Combinations changes the hue of a color and there are many types of them

Here we have 6 different combinations:

1. Complementary color

This returns the main color and the color with 180deg of hue rotation, the color on the oposite side of the color wheel. (Meaning if you where to input a blue color you would get yellow as the complementary color).

2. Split-complementary

This return three colors; the main color, one color with a hue rotation of +150deg and one of -150deg. This is to get two colors that complement the main one well. 

3. Trio

This one is very similar to the Split-complementary but has a hue rotation of +/-120deg. This devides the color evenly around the color wheel. (360/3 = 120)

4. Square

This one does the exact same as th trio but instead devides the wheel into 4 parts giving us steps of 90deg. 

5. Monocromatic

This returns 3 colors wich really is the main color and 2 color where th lightness has been incresed or decresed by 10. This gives 3 very similar colors that fit well together.

6. Analogous

This returns 3 colors where one is the main color and the other 2 has a hue rotation of 30 deg is opposite directions.

### Contrast

This is the last part of the website where you can play around with different colors to se how they do with each other when it comes to contrast. You will get back the contrast value along with a recomendation to wich use they fit. 

## Tools

- Vue
- Vite
- Nuxt
- JavaScript
- SCSS
- Firebase Hosting
- Firebase Storage
- Firebase Cloud Functions
- [color2k](https://color2k.com/)
