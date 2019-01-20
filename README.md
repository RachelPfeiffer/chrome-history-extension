# chrome-history-extension
## About
This is a neat little Chrome extension that helps me think before I click.
Once it's downloaded, it only takes 4 clicks to send your Chrome history from
the last 7 days to a trusted friend, and that means you are more likely to ask
yourself questions like "Do I actually want to visit this? At this time of night?"

## Writing the extension
The History API is the meat of this project. In background.js, we get all history
entries starting 1 week ago. After fetching the last many results, we wait for a
message from popup.js that we're ready to continue!

The content script here is popup.js - it sends a message to backup.js to send
over the last week's history, then sticks it in a CSV file and gets it ready for
download.

## Credits
I could not have done this project without Christian Genco's Chrome Export History
extension! Thank you!

## Feedback
Please open a pull request if you have any issues with this project - it was
totally new territory for me to write and terribly satisfying to work on!
