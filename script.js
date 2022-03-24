
let _speechSynth
let _voices
const _cache = {}
document.getElementById('button').hidden = true;      

/**
 * retries until there have been voices loaded. No stopper flag included in this example. 
 * Note that this function assumes, that there are voices installed on the host system.
 */

function loadVoicesWhenAvailable (onComplete = () => {}) {
  _speechSynth = window.speechSynthesis
  const voices = _speechSynth.getVoices()

  if (voices.length !== 0) {
    _voices = voices
    onComplete()
  } else {
    return setTimeout(function () { loadVoicesWhenAvailable(onComplete) }, 100)
  }
}

document.getElementById('button').click();


/**
 * Returns the first found voice for a given language code.
 */

function getVoices (locale) {
  if (!_speechSynth) {
    throw new Error('Browser does not support speech synthesis')
  }
  if (_cache[locale]) return _cache[locale]

  _cache[locale] = _voices.filter(voice => voice.lang === locale)
  return _cache[locale]
}

/**
 * Speak a certain text 
 * @param locale the locale this voice requires
 * @param text the text to speak
 * @param onEnd callback if tts is finished
 */

function playByText (locale, text, onEnd) {
  const voices = getVoices(locale)

  // TODO load preference here, e.g. male / female etc.
  // TODO but for now we just use the first occurrence
  const utterance = new window.SpeechSynthesisUtterance()
  utterance.voice = voices[0]
  utterance.voiceURI = 'native'
  utterance.volume = 1
  utterance.rate = 1
  utterance.pitch = 0.8
  utterance.text = text
  utterance.lang = locale

  if (onEnd) {
    utterance.onend = onEnd
  }

  _speechSynth.cancel() // cancel current speak, if any is running
  _speechSynth.speak(utterance)
}

// on document ready
loadVoicesWhenAvailable(function () {
 console.log("loaded") 
})

function mainMenu() {
    playByText("en-US", "Welcome to Royal Inn and Suit Hotel. Please choose one of the following options: 1: Contact Information. 2: Hotel Policies. 3. Reservation. 4. Hotel Properties. 5. Direction. 6. Nearby Attractions");
}

function option1() {
    playByText("en-US", "Our hotel is located at 710 N Lobdell Boulevard, Baton Rouge, Louisiana. Our phone number is (2,2,5) 8,3,1,9,2,5,5");
}

function option2() {
    playByText("en-US", "Please choose one of the following options: 1: Accessibility Policies..  2: General Policies..  3. Pet Policies..  4. Smoking Policies");
}

function option3() {
    playByText("en-US", "Our hotel has not supported making reservation through chatbot. Please call us at (2,2,5) 8,3,1,9,2,5,5 for further help");
}

function option4() {
  playByText("en-US", "Please choose one of the following options: Amenities, Facilities.");
}

function option5() {
  playByText("en-US", "Please say the name of the airport that you arrived in the format: From blank");
}

function option6() {
  playByText("en-US", "There are some tourist attrions around the hotel: 1: Theatre Baton Rouge.  2. Texas Club Concert Venue.  3. Circle Bowl.  4. Independence Park. Please respond in format: go to plus the name of your desired location");
}

function option21() {
    playByText("en-US", "We offer accessible guest rooms reserved for only individuals with disabilities. Wheelchair and wheelchair-accessible parking space are also accessible in our hotel.");
}

function option22() {
    playByText("en-US", "Our hotel is child-friendly with Children Activities and we offer 24-Hour Front-Desk ");
}

function option23() {
    playByText("en-US", "Our hotel allows pets with an extra charge of $20 per pet a day. Service animals are exempt from fees");
}

function option24() {
    playByText("en-US", "We have smoke-free policies accross the hotel. There is no guest room with smoking facilities");
}

function option41() {
  playByText("en-US", "We offer the following amenities: Hairdryer, Microwave, Toiletries, Iron and Ironing Board, Coffee Maker, Alarm Clock, Cable, Satellite TV, Free Wifi, Free Breakfast");
}

function option42() {
  playByText("en-US", "We offer the following facilities: swimming pool, Free Parking, Fitness Center, Meeting and Conference Room, Steam and Sauna Bath, Laundry ");
}

function getDirectionFrom(tag) {
  var url = "https://www.google.com/maps/dir/Royal+Inn+%26+Suites,+Lobdell+Boulevard,+Baton+Rouge,+LA/" + tag;
  window.open(url);
}

function getDirectionTo(tag) {
  var url = "https://www.google.com/maps/dir/" + tag + "/Royal+Inn+%26+Suites,+Lobdell+Boulevard,+Baton+Rouge,+LA/";
  window.open(url);
}

function optionCancel() {
  playByText ("en-US", "Royal Inn & Suites does have fully refundable room rates available to book on our site. If you've booked a fully refundable room rate, this can be cancelled up to a few days before check-in.");
}

function covidRestriction() {
  playByText ("en-US", "Social distancing measures are in place; staff at Royal Inn & Suites wear personal protective equipment; guests are provided with hand sanitizer; masks are required in public areas.");
}

function hotelReview() {
  var url = "https://www.expedia.com/Baton-Rouge-Hotels-SureStay-Plus-Hotel-By-Best-Western-Baton-Rouge.h20010895.Hotel-Information";
  window.open(url);
}

function checkin() {
  playByText ("en-US", "Check-in time is from 3 PM. Check-out time is before 11 AM.");
}

function parkingOption() {
  playByText ("en-US", "We have an on-site parking available for free. Wheelchair-accessible parking space is also available.");
}

function specialDiscount() {
  playByText ("en-US", "We offer 10% discount for only seniors and veterans.");
}

function roomServiceRequest() {
  var url = "https://forms.gle/A4FieUrYuWF47de5A";
  window.open(url);
}

function checkInDoc() {
  playByText ("en-US", "You will need to show a photo ID, and a credit card upon check-in.");
}

if (annyang) {
    document.getElementById('button').click();
    
    const triggerCmd = {  
        'hey Terry': mainMenu,
        'hi Terry': mainMenu 
    }
    annyang.addCommands(triggerCmd);
    
    
    annyang.start({ autoRestart: true });
    const mainOption = {  
        'contact information': option1, 'how can I contact the hotel': option1,
        'hotel policies': option2,
        'reservation': option3, "I want to make a reservation": option3, 'I want to reserve a room': option3,
        'hotel properties' : option4, 'properties' : option4,
        'direction' : option5, 'directions' : option5,
        'nearby attractions': option6, 'is there any attractions nearby the hotel?': option6
    };
    annyang.addCommands(mainOption);
    annyang.start({ autoRestart: true });

    const policiesCommand = {
        'accessibility policies': option21,
        'general policies': option22,
        'pet policies': option23, 'Can I bring my dogs to the hotel?':option23, 'is your hotel pet-friendly?':option23, 'can i bring my furry babies with me?': option23, 
        'how much does it cost to bring service animals':option23, 'are service animals exempt from fees?':option23, 'do i need to pay if i bring my service animals with me?': option23,
        'smoking policies': option24
    }
    annyang.addCommands(policiesCommand);
    annyang.start({ autoRestart: true });

    const directions = {
      'go to *tag' : getDirectionFrom,
      'from *tag' : getDirectionTo
    }
    annyang.addCommands(directions);
    annyang.start({ autoRestart: true });

    const cancelPolicies = {
      'cancel policy' : optionCancel, 'how to cancel' : optionCancel, 'cancel reservation' : optionCancel,
      'refund' : optionCancel, 'can i get a refund if i cancel my reservation?':optionCancel,
      'cancellation policy' : optionCancel,
    }
    annyang.addCommands(cancelPolicies);
    annyang.start({ autoRestart: true });

    const covid = {
      'covid-19' : covidRestriction, 'corona virus' : covidRestriction, 
      'covid restriction' : covidRestriction,
      'does this hotel practice social distancing' : covidRestriction
    }
    annyang.addCommands(covid);
    annyang.start({ autoRestart: true });

    const review = {
      'rating of this hotel' : hotelReview,
      'review of this hotel' : hotelReview,
      'show me the review of this hotel': hotelReview,
    }
    annyang.addCommands(review);
    annyang.start({ autoRestart: true });

    const checkInOut = {
      'What time can I check in?' : checkin, 'Can I check in early?' : checkin,
      'How early can I check in?': checkin, 'Is it possible to check in early?': checkin,
      'What time should I check out?': checkin, 'Tell me the check out time?' : checkin, 'check in time': checkin
    }
    annyang.addCommands(checkInOut);
    annyang.start({ autoRestart: true });

    const parking = {
      'does your hotel have a parking lot?': parkingOption, 'Is there handicapped parking space?': parkingOption,
      'do I need to pay for parking?': parkingOption, 'parking lot availability': parkingOption, 'parking space': parkingOption,
      'does this hotel provide free parking': parkingOption, 'parking lot': parkingOption
    }
    annyang.addCommands(parking);
    annyang.start({ autoRestart: true });

    const discount = {
      'is there any discount for veterans?': specialDiscount, 'is there any discount for seniors?': specialDiscount, 'is there any discount for students': specialDiscount,
      'can i get it cheaper if i am a students?': specialDiscount, 'do you offer any special discount?': specialDiscount, 'is there any discount available': specialDiscount,
      'what kind of discounts do you have?': specialDiscount, 'is there any way i can get it cheaper?': specialDiscount, 'special discount': specialDiscount
    }
    annyang.addCommands(discount);
    annyang.start({ autoRestart: true });

    const roomService = {
      'I need to request some service for my room': roomServiceRequest, 'room service request': roomServiceRequest, 'my room runs out of toiletries': roomServiceRequest, 'i need more towels for my room': roomServiceRequest,
      'my room needs some services': roomServiceRequest, "I would like more towels for my room": roomServiceRequest, 'my room runs of of towels': roomServiceRequest
    }
    annyang.addCommands(roomService);
    annyang.start({ autoRestart: true });
   

    const checkInDocument = {
      'what kind of documents are required during check in?': checkInDoc, 'what do I need to bring upon check in': checkInDoc, 'what is required upon check in': checkInDoc, 'what is required during check in': checkInDoc, 'check in document': checkInDoc,
      'Do I need to bring anything to check in?': checkInDoc, 'what kind of documents should I bring for check in': checkInDoc, 'what kind of documents are needed during check in?': checkInDoc, 'what is needed upon check in': checkInDoc, 'what is needed during check in': checkInDoc
    }
    annyang.addCommands(checkInDocument);


    annyang.start({ autoRestart: true });

  }