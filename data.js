data={
   "breathRate": [
      {
         default: 2
      },
      {
         name: "Breathing",
         value: 0.5
      },
      {
         name: "Speaking",
         value: 0.75
      },
      {
         name: "Singing",
         value: 1.0
      }
   ],
   "quantaProd": [
      {
         default: 3
      },
      {
         name: "Resting - Oral breathing",
         value: 5.7
      },
      {
         name: "Light exercise - Speaking",
         value: 490
      },
      {
         name: "Light exercise - Loudly speaking",
         value: 76
      },
      {
         name: "Heavy exercise - Oral breathing",
         value: 38
      },
   ],
   "quantaEffect": [
      {
         default: 1
      },
      {
         name: "Wildtype",
         value: 1
      },
      {
         name: "Delta",
         value: 1.7
      },
      {
         name: "Omicron BA.1",
         value: 3.18
      },
      {
         name: "Omicron BA.2",
         value: 4.46
      }
   ],
   "ventilation": [
      {
         default: 1
      },
      {
         name: "Closed windows",
         value: 0.3
      },
      {
         name: "Open windows",
         value: 2.0
      },
      {
         name: "Mechanical ventilation",
         value: 3.0
      },
      {
         name: "Air conditioning",
         value: 4.0
      },
      {
         name: "Open windows with fans",
         value: 6.0
      }
   ],
};

pathogen = [
   {
      name: "SARS-COV-2",
      data: {
         resting: 5.7,
         activity: 490,
         activity2: 76,
         heavyactivity: 38
      }
   },
   {
      name: "MERS 95%",
      data: {
         resting: 4.7,
         standing: 24,
         activity: 410
      }
   },
   {
      name: "TB (on treatment) 95%",
      data: {
         resting: 4,
         standing: 20,
         activity: 340
      }
   },
   {
      name: "Influenza (95%)",
      data: {
         resting: 0.84,
         standing: 4.1,
         activity: 72
      }
   },
   {
      name: "Coxsackievirus (95%)",
      data: {
         resting: 4,
         standing: 20,
         activity: 340
      }
   },
   {
      name: "Rhinovirus (95%)",
      data: {
         resting: 4.9,
         standing: 20,
         activity: 420
      }
   },
   {
      name: "TB (untreated) (95%)",
      data: {
         resting: 85,
         standing: 430,
         activity: 7299
      }
   },
   {
      name: "Adenovirus (95%)",
      data: {
         resting: 28,
         standing: 140,
         activity: 2400
      }
   },
   {
      name: "Measles (95%)",
      data: {
         resting: 1300,
         standing: 6400,
         activity: 110000
      }
   }
]