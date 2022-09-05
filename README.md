# PC Locs Coding Challenge

This is a three part exercise to show us what you can do. You should complete part one and then spend your time as you see fit on the other two.


## Part One - Simple Moving Average (SMA)
We require a function to calculate the simple moving average (SMA) over a set of values.

A simple moving average for a period is the average of the value over the number of periods before it. The period of time is not important but the average is of the data points themselves.

You have been given a function definition to implement and suite of tests to get you started. Feel free to add more tests to this suite.

You may find the following resources useful...
- https://www.investopedia.com/terms/s/sma.asp
- https://school.stockcharts.com/doku.php?id=technical_indicators:moving_averages


## Part Two - Exponential Moving Average (EMA)
Following on from the previous exercise we now want to calculate an exponential moving average (EMA).

An EMA favours more recent data points and thereby reduce lag. Using the SMA calculated in part one as the base data point you want to calculate the EMA for further points.

You have been given a function definition to implement.

You may find the following resources useful...
- https://www.investopedia.com/terms/e/ema.asp


## Part Three - The Customer Feature
We want to predict station usage for a customer who wants to always have some bays in reserve. They don't want to reserve these bays unnecessarily as it will reduce flexibility for users using stations.

As a minimum viable product we want to use an existing webhooks system to notify the customer when we predict that total bay usage is estimated to be above a threshold in the next hour. They will then lock out certain bays manually to reserve them.
The code to predict usage has been written using help from our EMA function above. It has a similar call signature and the value will need to be a percentage of total station usage.

Our system is serverless running on the AWS platform.
- Bay statuses are reflected in real time in a [DynamoDB](https://aws.amazon.com/dynamodb/) table
- You can trigger webhooks by pushing a message to an [SQS](https://aws.amazon.com/sqs/) topic


Your task is to provide a high level overview (no code necessary) of how you would implement this feature. You will need to take individual bay statuses, run the predictor function and then based on the result push to the SQS topic to notify the customer.

