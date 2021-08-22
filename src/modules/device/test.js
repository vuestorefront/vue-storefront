const { exec } = require('child_process');

let success = 0;
let every = 0;
const multiplier = 10;
const tests = [
  {
    name: 'Macbook',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15',
    expectedResults: {
      isMobile: false,
      isMobileOrTablet: false,
      isTablet: true,
      isDesktop: true,
      isDesktopOrTablet: true,
      isIos: false,
      isWindows: false,
      isMacOS: true
    }
  },
  {
    name: 'Windows 10, Chrome',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    expectedResults: {
      isMobile: false,
      isMobileOrTablet: false,
      isTablet: true,
      isDesktop: true,
      isDesktopOrTablet: true,
      isIos: false,
      isWindows: true,
      isMacOS: false
    }
  },
  {
    name: 'Android Tablet, Firefox',
    userAgent: 'Mozilla/5.0 (Android 4.4; Tablet; rv:70.0) Gecko/70.0 Firefox/70.0',
    expectedResults: {
      isMobile: false,
      isMobileOrTablet: true,
      isTablet: false,
      isDesktop: false,
      isDesktopOrTablet: true,
      isIos: false,
      isWindows: false,
      isMacOS: false
    }
  },
  {
    name: 'Blackberry BB10',
    userAgent: 'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.1+ (KHTML, like Gecko) Version/10.0.0.1337 Mobile Safari/537.1+',
    expectedResults: {
      isMobile: true,
      isMobileOrTablet: true,
      isTablet: false,
      isDesktop: false,
      isDesktopOrTablet: false,
      isIos: false,
      isWindows: false,
      isMacOS: false
    }
  },
  {
    name: 'Android 2.3 - Nexus S',
    userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
    expectedResults: {
      isMobile: true,
      isMobileOrTablet: true,
      isTablet: false,
      isDesktop: false,
      isDesktopOrTablet: false,
      isIos: false,
      isWindows: false,
      isMacOS: false
    }
  },
  {
    name: 'Safari iPhone iOS 13.2',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    expectedResults: {
      isMobile: true,
      isMobileOrTablet: true,
      isTablet: false,
      isDesktop: false,
      isDesktopOrTablet: false,
      isIos: true,
      isWindows: false,
      isMacOS: true
    }
  }
];

const checkTestResult = (output, testName, testValue) => output.includes(`TEST: ${testName}-${testValue}`);
const checkTests = (output, expectedResults) => Object.entries(expectedResults).every(([testName, testValue]) => checkTestResult(output, testName, testValue));

for (let i = 0; i < multiplier; i++) {
  for (let test of tests) {
    console.log(`[${test.name}] Starting...`);
    exec(`curl http://localhost:3000/device-mod-test -A "${test.userAgent}"`, (err, output) => {
      every++;
      if (err) {
        console.log(`[${test.name}] Thrown an error`)
      }

      // the *entire* stdout and stderr (buffered)
      // console.log(`stdout: ${output}`);
      //   console.log(`stderr: ${stderr}`);
      if (checkTests(output, test.expectedResults)) {
        console.log(`[${test.name}] Succeed`)
        success++;
      } else {
        console.error(`[${test.name}] Failed`)
      }
      console.log(`${success}/${every} succeed`)
    });
  }
}
console.log('----------------')
