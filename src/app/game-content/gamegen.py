import math
import random


circleData = []

rowRange = {
    1: [1, 2, 3],
    2: [1, 2, 3, 4],
    3: [1, 2, 3],
    4: [1, 2, 3, 4],
}
passedCoordinates = []


def checkCircle(currentCircle, circleData):
    # if (currentCircle['xPos'], currentCircle['xPos']) in passedCoordinates:
    #     return

    if (currentCircle['xPos'], currentCircle['yPos']) not in passedCoordinates:
        circleData.append(currentCircle)
        passedCoordinates.append(
            (currentCircle['xPos'], currentCircle['yPos']))
    print(passedCoordinates)

    odds = 1 - (len(circleData) / 14)
    # check right
    if currentCircle['xPos'] + 1 in rowRange[currentCircle['yPos']] and random.random() < odds and (currentCircle['xPos'] + 1, currentCircle['xPos']) not in passedCoordinates:
        checkCircle(
            {'xPos': currentCircle['xPos'] + 1, 'yPos': currentCircle['yPos'], 'lines': []}, circleData)
    # check left
    if currentCircle['xPos'] - 1 in rowRange[currentCircle['yPos']] and random.random() < odds and (currentCircle['xPos'] - 1, currentCircle['xPos']) not in passedCoordinates:
        checkCircle(
            {'xPos': currentCircle['xPos'] - 1, 'yPos': currentCircle['yPos'], 'lines': []}, circleData)
    # check up
    if currentCircle['yPos'] + 1 in rowRange and currentCircle['xPos'] in rowRange[currentCircle['yPos'] + 1] and random.random() < odds and (currentCircle['xPos'], currentCircle['yPos'] + 1) not in passedCoordinates:
        checkCircle(
            {'xPos': currentCircle['xPos'], 'yPos': currentCircle['yPos'] + 1, 'lines': []}, circleData)
    # check down
    if currentCircle['yPos'] - 1 in rowRange and currentCircle['xPos'] in rowRange[currentCircle['yPos'] - 1] and random.random() < odds and (currentCircle['xPos'], currentCircle['yPos'] - 1) not in passedCoordinates:
        checkCircle(
            {'xPos': currentCircle['xPos'], 'yPos': currentCircle['yPos'] - 1, 'lines': []}, circleData)
    # check up-left
    if currentCircle['yPos'] + 1 in rowRange and currentCircle['xPos'] - 1 in rowRange[currentCircle['yPos'] + 1] and random.random() < odds and (currentCircle['xPos'] - 1, currentCircle['yPos'] + 1) not in passedCoordinates:
        checkCircle(
            {'xPos': currentCircle['xPos'] - 1, 'yPos': currentCircle['yPos'] + 1, 'lines': []}, circleData)
    # check down-left
    if currentCircle['yPos'] - 1 in rowRange and currentCircle['xPos'] - 1 in rowRange[currentCircle['yPos'] - 1] and random.random() < odds and (currentCircle['xPos'] - 1, currentCircle['yPos'] - 1) not in passedCoordinates:
        checkCircle(
            {'xPos': currentCircle['xPos'] - 1, 'yPos': currentCircle['yPos'] - 1, 'lines': []}, circleData)
    # if currentCircle == None:
    #     nextCircle = {'xPos': 1, 'yPos': 1, 'lines': [
    #         {'angle': math.pi * 1/3, 'correct': False}]}
    # else:
    #     nextCircle = {'xPos': currentCircle['xPos'] + 1, 'yPos': currentCircle['yPos'] + 1, 'lines': [
    #         {'angle': math.pi * 1/3, 'correct': False}]}
    # circleData.append(nextCircle)
    # if nextCircle['xPos'] >= 4:
    #     return circleData
    # return checkCircle(nextCircle, circleData)


checkCircle({'xPos': 1, 'yPos': 1, 'lines': []}, circleData)


for circle in circleData:
    print(circle)
    # check up
    if (circle['xPos'], circle['yPos'] - 1) in passedCoordinates:
        if circle['yPos'] % 2 == 0:  # current circle is on even row
            circle['lines'].append({'angle': math.pi * 5/3, 'correct': False})
        else:
            circle['lines'].append({'angle': math.pi * 4/3, 'correct': False})
    # check down
    if (circle['xPos'], circle['yPos'] + 1) in passedCoordinates:
        if circle['yPos'] % 2 == 0:  # current circle is on even row
            circle['lines'].append({'angle': math.pi * 1/3, 'correct': False})
        else:
            circle['lines'].append({'angle': math.pi * 2/3, 'correct': False})
    # check left
    if (circle['xPos'] - 1, circle['yPos']) in passedCoordinates:
        circle['lines'].append({'angle': math.pi * 3/3, 'correct': False})
    # check right
    if (circle['xPos'] + 1, circle['yPos']) in passedCoordinates:
        circle['lines'].append({'angle': 0, 'correct': False})
    # check up-left
    if circle['yPos'] % 2 == 0 and (circle['xPos'] - 1, circle['yPos'] - 1) in passedCoordinates:
        circle['lines'].append({'angle': math.pi * 4/3, 'correct': False})
    elif circle['yPos'] % 2 == 1 and (circle['xPos'] + 1, circle['yPos'] - 1) in passedCoordinates:
        circle['lines'].append({'angle': math.pi * 5/3, 'correct': False})
	# check down-left
    if circle['yPos'] % 2 == 0 and (circle['xPos'] - 1, circle['yPos'] + 1) in passedCoordinates:
        circle['lines'].append({'angle': math.pi * 2/3, 'correct': False})
    elif circle['yPos'] % 2 == 1 and (circle['xPos'] + 1, circle['yPos'] + 1) in passedCoordinates:
        circle['lines'].append({'angle': math.pi * 1/3, 'correct': False})
        # if (circle['xPos'] - 1, circle['yPos'] + 1) in passedCoordinates:
        #     if circle['yPos'] % 2 == 0:  # current circle is on even row
        #         circle['lines'].append({'angle': math.pi * 2/3, 'correct': False})
        #     else:
        #         circle['lines'].append({'angle': math.pi * 1/3, 'correct': False})


# TODO- go through each circle again and remove lines at random and remove corresponding line in adjacent circle (will be inefficient)

print(circleData, len(circleData))
