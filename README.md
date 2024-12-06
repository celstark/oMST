# oMST
## Overview
The Mnemonic Similarity Task began in 2007 (Kirwan & Stark, 2007) as a way to assess hippocampal 
function by using an object recognition memory task that consisted of studied targets, novel foils,
and lures that had a controlled level of similarity (mnemonic similarity, not perceptual similarity)
to studied items. It is [available here on GitHub](https://github.com/celstark/MST).

The goal of a number of studies in 2019-22 and one of the aims of an NIA grant (R01 AG066683-01) was to
develop a more optimized version of the task that might be more suitable for clinical use.  The results
of these studies are published ([Stark et al., 2023](https://www.frontiersin.org/articles/10.3389/fnbeh.2023.1080366/full)), but the outcome of those efforts is the oMST presented here.

Briefly, it is an continuous version of the MST using the old/similar/new response prompt and cutting down
the stimuli to include 64 1st presentations, 20 repeated targets, and 44 similar lure trials.  In addition,
there is a guided instruction / practice task included.  In total, it takes under half the time of the orignal
task.

The code here uses [jsPsych](https://www.jspsych.org/7.3/) and [JATOS](https://www.jatos.org/) to administer 
the experiment in your browser.  The correct version of jsPsych is bundled here, but you will need to 
install JATOS and add these files into an "oMST" experiment you create (the name is up to you).

## Installation
The easiest way to get going is to go to the [Releases section on GitHub](https://github.com/celstark/MST/releases), download the `.jzip` file, and import that into an instance of JATOS. Just cloning or downloading this repository won't work. You'd need to add each of the `html` files into an experiment manually to get that to work.

## Configuration
There are two configuration routes for you here: _Study Properties_ / _Batch Properties_ and `setup.html`.  

### JATOS property pages
In JATOS, hit the _Properties_ button to see the _Study Properties_ and you should get a dialog with a bit of customizable JSON code that looks like this:
```
{
  "include_consent": 0,
  "include_demographics": 0,
  "include_idcode": 0,
  "include_icon": 0,
  "lang": "en"
}
```
Those "include" lines let you customize what phases are shown: a consent form, a demographics form, a "enter an ID code" form, and our "immediate memory control task" (a delayed match to sample type task).  The last one lets you set your language.  There are other things you can setup here, though.  Have a look in `setup.html` and you'll see things like a `selfpaced` option in there.  Anything you put in here will be the default for the study.

These options, though, are also customizable in the _Batch Properties_ for any batches you run.  Want one version run in English and one in Spanish setup as different batches?  Just have the _Batch Properties_ set the "lang" variable in each.  Anything in Batch will override what's in Study.

### setup.html
The code in here sets up a number of defaults.  Revise this to your heart's content.

### Language options
We're using the standard 2-letter language codes here. Currently, translations exist for English (en), Spanish (es), Korean (kr), Russian (ru), and Dutch (nl).  Just set the "lang" parameter above to engage one of them.