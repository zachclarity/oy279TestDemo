# oy279TestDemo

Demo Mocha - Selenium Chrome Testing.

Simple Demo of Testing with Selenium using Mocha:

First:  Install the Chrome Driver from https://chromedriver.chromium.org/

Set Environment PATH to include chromdriver.

Test on unix with:  which chromedriver.

Then:
<PRE>
npm install


NOTE: Set two environment vars to your web test user and test password:

-- export DEMOUSER=<demo user>
-- export DEMOPASS=<demo pass>

Start Test:

npm test

> cmstest@1.0.0 test /Users/zachlewis/mywork/cmswork/oy279TestDemo
> mocha



  Website Up 
    ✓ Website Up and Running (1682ms)
    ✓ Title Found
    ✓ Show Login Page (84ms)
    ✓ Login Test User (1617ms)

  Check Spa Error Message 
[***DEBUG***] The SPA ID must be in the format of SS-YY-NNNN or SS-YY-NNNN-xxxx !
    ✓ SPA Form Error Message (127ms)

  Check Spa RAI Transmittal Error Message  Check
[***DEBUG***] The SPA ID must be in the format of SS-YY-NNNN or SS-YY-NNNN-xxxx !
    ✓ Spa RAI Form Error Message (111ms)

  Waiver Transmittal Error Message Check 
[***DEBUG***] The Waiver ID must be in the format of SS.##.R##.M## or SS.####.R##.## !
    ✓ Waiver Transmittal Error Form Error Message (171ms)

  Check Waiver RAI Transmittal Error Message  Check
[***DEBUG***] The Waiver ID must be in the format of SS.##.R##.M## or SS.####.R##.## !
    ✓ Waiver RAI Form Error Message (87ms)

  Check Waiver Extension Transmittal Error Message  Check
[***DEBUG***] The Waiver ID must be in the format of SS.##.R##.M## or SS.####.R##.## !
    ✓ Waiver Extension Form Error Message (89ms)


  9 passing (4s)
  </PRE>

