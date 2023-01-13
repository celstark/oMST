# oMST
Optimized Mnemonic Similarity Task

The Mnemonic Similarity Task began in 2007 (Kirwan & Stark, 2007) as a way to assess hippocampal 
function by using an object recognition memory task that consisted of studied targets, novel foils,
and lures that had a controlled level of similarity (mnemonic similarity, not perceptual similarity)
to studied items. It is [available here on GitHub](https://github.com/celstark/MST).

The goal of a number of studies in 2019-22 and one of the aims of an NIA grant (R01 AG066683-01) was to
develop a more optimized version of the task that might be more suitable for clinical use.  The results
of these studies are currently under review (Stark et al., under review), but the outcome of those efforts
is the oMST presented here.

Briefly, it is an continuous version of the MST using the old/similar/new response prompt and cutting down
the stimuli to include 64 1st presentations, 20 repeated targets, and 44 similar lure trials.  In addition,
there is a guided instruction / practice task included.  In total, it takes under half the time of the orignal
task.

The code here uses [jsPsych](https://www.jspsych.org/7.3/) and [JATOS](https://www.jatos.org/) to administer 
the experiment in your browser.  The correct version of jsPsych is bundled here, but you will need to 
install JATOS and add these files into an "oMST" experiment you create (the name is up to you).
