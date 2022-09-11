# Customer Feature - Station usage prediction

We want to predict station usage for a customer who wants to always have some bays in reserve. They don't want to reserve these bays unnecessarily as it will reduce flexibility for users using stations.

As a minimum viable product we want to use an existing webhooks system to notify the customer when we predict that total bay usage is estimated to be above a threshold in the next hour. They will then lock out certain bays manually to reserve them. The code to predict usage has been written using help from our EMA function above. It has a similar call signature and the value will need to be a percentage of total station usage.

## Basic design

The system will use a modified Exponential Moving Average (EMA) function to determine the predicted station usage. It will run periodically, and use an existing webhooks feature to notify the customer when the predicted usage for the next hour will exceed a configured threshold.

Station usage is reflected in real time from a DynamoDB table.
Webhooks can be triggered by pushing a message to an SQS topic.

The station usage over the last hour will be determined by querying the DynamoDB table. This historical usage information will be given to the predictor function. The usage information format is not known, but for the purpose of this document, it is assumed to be an array of station identifiers, along with a boolean value true/false to indicate if that station is in use.

The predictor function will take the historical usage information, and use that to determine the predicted station usage for the next hour. The historical usage information will be converted into an array giving the total station usage as a percentage for each time period. It will return a value indicating the predicted station usage for the next hour.

If the predicted usage exceeds the configured threshold, a message will be pushed to the SQS topic to notify the customer.
