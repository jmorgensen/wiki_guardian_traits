const DISPLAY_ORDER = [
    "lustful",
    "chaste",
    "gluttonous",
    "temperate",
    "greedy",
    "charitable",
    "slothful",
    "diligent",
    "wroth",     // wroth/patient shown as #5 and envious/kind shown as #6, but reversed in code
    "patient",
    "envious",
    "kind",
    "proud",
    "humble",
    "deceitful",
    "honest",
    "craven",
    "brave",
    "shy",
    "gregarious",
    "ambitious",
    "content",
    "arbitrary",
    "just",
    "cynical",
    "zealous",
    "paranoid",
    "trusting",
    "cruel"
];

const FREQ = {
    lustful:     4911 / 42768,
    chaste:      3394 / 42768,
    gluttonous:  6665 / 42768,
    temperate:   6887 / 42768,
    greedy:      6245 / 42768,
    charitable:  6801 / 42768,
    slothful:    5183 / 42768,
    diligent:    5948 / 42768,
    envious:     5630 / 42768,
    kind:        7230 / 42768,
    wroth:       6696 / 42768,
    patient:     6686 / 42768,
    proud:       6255 / 42768,
    humble:      6594 / 42768,
    deceitful:   7053 / 42768,
    honest:      6209 / 42768,
    craven:      6326 / 42768,
    brave:       6894 / 42768,
    shy:         5985 / 42768,
    gregarious:  6848 / 42768,
    ambitious:   6452 / 42768,
    content:     6244 / 42768,
    arbitrary:   6148 / 42768,
    just:        6357 / 42768,
    cynical:     5520 / 42768,
    zealous:     5667 / 42768,
    paranoid:    4540 / 42768,
    trusting:    4451 / 42768,
    cruel:       5431 / 42768
};


function calc_child_values(iv)
{
    // Turns out religion doesn't matter here. Guardians have almost no influence on
    // traits that different religions consider differently (mostly lustful/chaste).
    var p_christian = 1;
    var p_muslim = 0;

    return {
        lustful:
            1 * iv.intrigue +
            -0.25 * iv.monthly_piety +
            -10 * (1 - p_muslim) * FREQ.chaste * iv.general_opinion +   // no chaste muslims
            -p_christian * iv.church_opinion,

        chaste:
            (1 - p_muslim) * (
                0.50 * iv.monthly_piety +
                1 * iv.learning +
                10 * p_christian * iv.church_opinion
            ),

        gluttonous:
            -15 * iv.sex_appeal_opinion +
            -10 * iv.church_opinion +
            -2 * iv.stewardship +
            5 * FREQ.gluttonous * iv.general_opinion +
            -10 * FREQ.temperate * iv.general_opinion,

        temperate:
            2 * iv.stewardship +
            10 * iv.church_opinion +
            10 * FREQ.temperate * iv.general_opinion,

        greedy:
            -1 * iv.diplomacy +
            -10 * FREQ.charitable * iv.general_opinion,

        charitable:
            3 * iv.diplomacy +
            10 * iv.church_opinion +
            10 * FREQ.charitable * iv.general_opinion,

        slothful:
            -10 * iv.vassal_opinion +
            -10 * FREQ.diligent * iv.general_opinion +
            -1 * iv.diplomacy +
            -1 * iv.intrigue +
            -1 * iv.stewardship +
            -1 * iv.martial +
            -1 * iv.learning,

        diligent:
            10 * iv.vassal_opinion +
            10 * FREQ.diligent * iv.general_opinion +
            1 * iv.diplomacy +
            1 * iv.intrigue +
            1 * iv.stewardship +
            1 * iv.martial +
            1 * iv.learning,

        wroth:
            -1 * iv.diplomacy +
            -1 * iv.intrigue +
            3 * iv.martial +
            -10 * FREQ.patient * iv.general_opinion,

        patient:
            1 * iv.diplomacy +
            1 * iv.intrigue +
            1 * iv.stewardship +
            1 * iv.learning,

        envious:
            -10 * FREQ.kind * iv.general_opinion +
            2 * iv.intrigue +
            -1 * iv.diplomacy,

        kind:
            10 * iv.vassal_opinion +
            10 * FREQ.kind * iv.general_opinion +
            -2 * iv.intrigue +
            2 * iv.diplomacy,

        proud:
            -10 * FREQ.humble * iv.general_opinion +
            0.5 * iv.monthly_prestige,

        humble:
            10 * FREQ.humble * iv.general_opinion +
            1 * iv.monthly_piety,

        deceitful:
            -10 * FREQ.honest * iv.general_opinion +
            3 * iv.intrigue +
            -2 * iv.diplomacy,

        honest:
            -10 * FREQ.deceitful * iv.general_opinion +
            10 * FREQ.honest * iv.general_opinion +
            -2 * iv.intrigue +
            3 * iv.diplomacy,

        craven:
            -5 * iv.vassal_opinion +
            -10 * FREQ.brave * iv.general_opinion +
            -2 * iv.martial,

        brave:
            10 * iv.vassal_opinion +
            10 * FREQ.brave * iv.general_opinion +
            2 * iv.martial,

        shy:
            -2 * iv.diplomacy,

        gregarious:
            5 * FREQ.gregarious * iv.general_opinion +
            5 * iv.sex_appeal_opinion +
            5 * iv.vassal_opinion +
            2 * iv.diplomacy,

        ambitious:
            -5 * FREQ.ambitious * iv.general_opinion +
            2 * iv.diplomacy +
            2 * iv.intrigue +
            2 * iv.stewardship +
            2 * iv.martial +
            2 * iv.learning,

        content:
            -1 * iv.intrigue +
            0.50 * iv.monthly_piety,

        arbitrary:
            -10 * FREQ.just * iv.general_opinion +
            -2 * iv.stewardship +
            -1 * iv.learning +
            -10 * iv.vassal_opinion,

        just:
            2 * iv.stewardship +
            1 * iv.learning +
            10 * iv.vassal_opinion +
            10 * FREQ.just * iv.general_opinion,

        cynical:
            2 * iv.intrigue +
            -5 * iv.church_opinion +
            10 * FREQ.cynical * iv.general_opinion +
            -10 * FREQ.zealous * iv.general_opinion +
            -.20 * iv.monthly_piety,

        zealous:
            2 * iv.martial +
            10 * iv.church_opinion +
            -10 * FREQ.cynical * iv.general_opinion +
            30 * FREQ.zealous * iv.general_opinion +  // limited to characters of the same religion
            1.00 * iv.monthly_piety,

        paranoid:
            2 * iv.intrigue +
            -1 * iv.diplomacy,

        trusting:
            -2 * iv.intrigue +
            1 * iv.diplomacy,

        cruel:
            -10 * FREQ.kind * iv.general_opinion +
            1 * iv.intrigue +
            -1 * iv.diplomacy +
            -10 * iv.vassal_opinion
    };
}


const ward_and_guardian_events = {
    gain_gluttonous: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, gluttonous: 4, slothful: 2, temperate: 0, result: { gluttonous: 1 } },
            /* birch */ { base: 10, kind: 0, gluttonous: 0.1, wroth: 5, cruel: 5, result: { gluttonous: 0.6 } },
            /* talk */ { base: 10, gluttonous: 0, temperate: 20, diligent: 10, celibate: 10, result: { temperate: 0.5 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { gluttonous: 0.8 } },
        ]
    },
    gain_temperate: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, temperate: 5, diligent: 4, result: { temperate: 1 } },
            /* exhibit */ { base: 10, gluttonous: 0, temperate: 5, proud: 10, result: { temperate: 1 } },    // best choice: can also add 1 stewardship
            /* thankgod */ { base: 2, zealous: 150, result: { temperate: 0.9, gluttonous: 0.1 } },
            /* oops */ { base: 10, temperate: 0, gluttonous: 5, slothful: 5, result: { gluttonous: 0.5, temperate: 0.1 } },
        ]
    },

    gain_greedy: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, greedy: 5, envious: 5, result: { greedy: 1 } },
            /* birch */ { base: 10, kind: 0, cruel: 5, wroth: 5, greedy: 0.1, result: { greedy: 0.6 } },
            /* talk */ { base: 10, greedy: 0, charitable: 5, kind: 5, result: { charitable: 0.5, greedy: 0.1 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { greedy: 0.8 } },
        ]
    },
    gain_charitable: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, chariable: 5, diligent: 4, kind: 4, result: { charitable: 1 } },
            /* exhibit */ { base: 10, greedy: 0, charitable: 5, proud: 10, result: { charitable: 1 } },    // best choice: can also add 1 diplomacy
            /* thankgod */ { base: 2, zealous: 150, result: { charitable: 0.9, greedy: 0.1 } },
            /* oops */ { base: 10, charitable: 0, gluttonous: 5, slothful: 5, result: { greedy: 0.5, charitable: 0.1 } },
        ]
    },

    gain_slothful: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, slothful: 4, gluttonous: 2, result: { slothful: 1 } },
            /* birch */ { base: 10, kind: 0, cruel: 5, wroth: 5, slothful: 0.1, result: { slothful: 0.6 } },
            /* talk */ { base: 10, slothful: 0, diligent: 5, kind: 5, result: { diligent: 0.5, slothful: 0.1 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { slothful: 0.8 } },
        ]
    },
    gain_diligent: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, diligent: 5, temperate: 5, result: { diligent: 1 } },  // can add stats if guardian is amazing
            /* exhibit */ { base: 10, slothful: 0, diligent: 5, proud: 10, result: { diligent: 1 } },    // can add stats if guardian is amazing
            /* thankgod */ { base: 2, zealous: 150, result: { diligent: 0.9, slothful: 0.1 } },
            /* oops */ { base: 10, diligent: 0, gluttonous: 5, slothful: 5, result: { slothful: 0.5, diligent: 0.1 } },
        ]
    },

    gain_envious: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, envious: 5, arbitrary: 2, greedy: 5, result: { envious: 1 } },
            /* birch */ { base: 10, kind: 0, cruel: 5, wroth: 5, slothful/*!*/: 0.1, result: { envious: 0.6 } },
            /* talk */ { base: 10, envious: 0, just: 5, kind: 5, result: { kind: 0.5, envious: 0.1 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { envious: 0.8 } },
        ]
    },
    gain_cruel: {  // extra opposite for kind
        frequency: 100,
        options: [
            /* encourage */ { base: 10, cruel: 5, greedy: 5, result: { cruel: 1 } },
            /* birch */ { base: 10, kind: 0, cruel: 0, wroth: 10, result: { cruel: 0.6 } },
            /* talk */ { base: 10, cruel: 0, just: 5, kind: 5, result: { kind: 0.5, cruel: 0.1 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { cruel: 0.8 } },
        ]
    },
    gain_kind: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, kind: 5, temperate: 5, result: { kind: 1 } },
            /* exhibit */ { base: 10, envious: 0, kind: 5, proud: 10, result: { kind: 1 } },
            /* thankgod */ { base: 2, zealous: 150, result: { kind: 0.9, envious: 0.1 } },
            /* oops */ { base: 10, kind: 0, envious: 5, arbitrary: 5, greedy: 5, result: { envious: 0.5, kind: 0.1 } },
        ]
    },

    gain_wroth: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, wroth: 5, envious: 5, result: { wroth: 1 } },
            /* birch */ { base: 10, patient: 0, cruel: 5, arbitrary: 5, result: { wroth: 0.7, patient: 0.3 } },  // unusual birch
            /* talk */ { base: 10, wroth: 0, kind: 5, patient: 5, result: { patient: 0.5, wroth: 0.1 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { wroth: 0.8 } },
        ]
    },
    gain_patient: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, kind: 4, just: 2, patient: 6, result: { patient: 1 } },   // plus extra stats for child
            /* exhibit */ { base: 10, wroth: 0, patient: 5, proud: 10, result: { patient: 1 } },     // plus extra stats for GUARDIAN
            /* thankgod */ { base: 2, zealous: 150, result: { patient: 0.9, wroth: 0.1 } },
            /* oops */ { base: 10, patient: 0, envious: 5, arbitrary: 5, wroth: 10, result: { wroth: 0.5, patient: 0.1 } },
        ]
    },

    gain_proud: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, proud: 5, ambitious: 5, result: { proud: 1 } },
            /* birch */ { base: 10, kind: 0/*!*/, cruel: 5, arbitrary: 5, result: { proud: 0.6 } },
            /* talk */ { base: 10, proud: 0, content: 5, humble: 5, result: { humble: 0.5, proud: 0.1 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { proud: 0.8 } },
        ]
    },
    gain_humble: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, humble: 5, content: 5, result: { humble: 1 } },
        // no exhibit, since that's associated with pride
            /* thankgod */ { base: 2, zealous: 150, result: { humble: 0.9, proud: 0.1, wroth: 0.1/*!*/ } },
            /* oops */ { base: 10, humble: 0, proud: 5, ambitious: 5, result: { proud: 0.5, humble: 0.1 } },
        ]
    },

    // Personality traits other than sins/virtues:
    // * These events are less regular.
    // * Since these aren't sins/virtues, "pray" and "thankgod" may be replaced by other options.
    // * Since there isn't a clear "good" direction, diligent/kind may not have any effect.

    gain_deceitful: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, deceitful: 5, result: { deceitful: 1 } },  // plus rare stat gain
            /* birch */ { base: 10, kind: 0, wroth: 5, cruel: 5, result: { deceitful: 0.6, wroth: 0.1/*!*/ } },
            /* talk */ { base: 10, deceitful: 0, honest: 5, result: { honest: 0.5, deceitful: 0.1 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { deceitful: 0.8 } },
        ]
    },
    gain_honest: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, honest: 5, result: { honest: 1 } },
            /* exhibit */ { base: 10, deceitful: 0, proud: 10, result: { honest: 1 } },  // stat gain for GUARDIAN
            /* nope */ { base: 10, honest: 0, result: { } },
            /* oops */ { base: 10, deceitful: 5, wroth: 5, result: { deceitful: 0.5, honest: 0.1 } },
        ]
    },

    gain_zealous: {
        frequency: 100,  // muslim event is identical. indian_group is excluded, but i'm ignoring that.
        options: [
            /* encourage */ { base: 10, zealous: 200, cynical: 0, result: { zealous: 1 } },  // plus possible 1 learning and 5 piety
            /* discourage */ { base: 10, cynical: 200, zealous: 0, result: { } },
        ]
    },
    gain_cynical: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, cynical: 200, zealous: 0, result: { cynical: 1 } },  // plus possible 1 intrigue
            /* discourage */ { base: 10, zealous: 200, cynical: 0, result: { } },
        ]
    },

    gain_craven: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, craven: 10, brave: 0, result: { craven: 1 } },
            /* limit */ { base: 10, content: 5, result: { content: 0.5, craven: 0.2 } },  // mislabeled in the script
            /* talk */ { base: 10, brave: 20, ambitious: 5, result: { brave: 0.25 } },
        ]
    },
    gain_brave: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, brave: 5, ambitious: 5, craven: 0, result: { brave: 1 } },  // plus possible 1 martial
            /* exhibit */ { base: 10, craven: 0, proud: 10, result: { brave: 1 } },
            /* oops */ { base: 10, brave: 0, craven: 20, slothful: 5, result: { craven: 0.5, brave: 0.1 } },
        ]
    },

    gain_shy: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, shy: 4, humble: 2, content: 2, proud: 0, gregarious: 0, result: { shy: 1 } },
            /* birch */ { base: 10, kind: 0, shy: 0, wroth: 5, cruel: 5, result: { shy: 0.6 } },
            /* talk */ { base: 10, shy: 0, temperate/*!*/: 20, diligent: 10, celibate: 10, result: { gregarious: 0.5, shy: 0.1 } },
            /* pray */ { base: 2, cynical: 0, zealous: 150, result: { shy: 0.8 } },
        ]
    },
    gain_gregarious: {
        frequency: 100,
        options: [
            /* encourage */ { base: 10, gregarious: 5, proud: 4, ambitious: 4, shy: 0, result: { gregarious: 1 } },  // plus chance of diplomacy gain
            /* exhibit */ { base: 10, shy: 0, proud: 10, result: { gregarious: 1 } },  // plus chance of diplomacy gain
            /* thankgod */ { base: 2, zealous: 150, result: { gregarious: 0.9, shy: 0.1 } },
            /* oops */ { base: 10, temperate/*!*/:0, shy: 5, humble: 5, honest: 5, result: { shy: 0.5, gregarious: 0.1 } },
        ]
    },

    gain_ambitious: {
        frequency: 100,
        options: [
            /* encourage */ { base: 50/*high*/, ambitious: 4, proud: 2, result: { ambitious: 1 } },
            /* discourage */ { base: 10, content: 20, humble: 10, result: { } },
        ]
    },
    gain_content: {
        frequency: 100,
        options: [
            /* encourage */ { base: 50/*high*/, content: 4, humble: 2, result: { content: 1 } },
            /* discourage */ { base: 10, ambitious: 20, proud: 10, result: { } },
        ]
    },


    gain_arbitrary: {
        frequency: 100,
        options: [
            /* encourage */ { base: 50/*high*/, arbitrary: 4, slothful: 2, deceitful: 2, result: { arbitrary: 1 } },
            /* discourage */ { base: 10, just: 20, honest: 10, diligent: 10, result: { } },
        ]
    },
    gain_just: {
        frequency: 100,
        options: [
            /* encourage */ { base: 50/*high*/, just: 4, diligent: 2, honest: 2, result: { just: 1 } },
            /* discourage */ { base: 10, arbitrary: 20, slothful: 10, deceitful: 10, result: { } },
        ]
    },

    // Note: there is no gain_paranoid or gain_trusting

    // Special childhood events (all skipped)
    // Skipped: MTTH events for homosexual
    // Skipped: toddler events (child is too young to have a guardian)
    // Skipped: "where is mom?" (always asked of father, regardless of guardian)

    // Young children flavor events
    // I'm giving these a frequency of "11" based on:
    // * on_action weight 20
    // * only half of ward age range
    // * unlikely to already have 5 personality traits at this age

    trouble_making_friends: {
        frequency: 11,
        options: [
            /* whatevs */ { base: 10, shy: 4, proud: 2, result: { proud: 0.5, shy: 0.3, slothful: 0.2 } },
            /* help */ { base: 10, gregarious: 4, honest: 2, result: { gregarious: 0.6, honest: 0.4 } },
            /* toys */ { base: 10, deceitful: 4, greedy: 2, result: { deceitful: 0.6, greedy: 0.4 } },
        ]
    },

    play_vs_study: {
        frequency: 11,
        options: [
            /* after_school */ { base: 10, just: 4, humble: 2, result: { just: 0.5, humble: 0.45, shy: 0.05 } },
            /* play */ { base: 10, gregarious: 4, proud: 2, result: { gregarious: 0.6, proud: 0.3, arbitrary: 0.1 } },
            /* threaten */ { base: 10, wroth: 4, cruel: 2, result: { wroth: 0.7, deceitful: 0.3 } },
        ]
    },

    heathens: {
        frequency: 11,
        options: [
            /* just_like_us */ { base: 10, kind: 4, honest: 2, zealous: 0, result: { kind: 0.5, honest: 0.4, gregarious: 0.1 } },
            /* demons */ { base: 10, wroth: 2, zealous: 10, result: { zealous: 0.6, wroth: 0.3, cruel: 0.1 } },
            /* enemies */ { base: 10, just: 6, result: { just: 0.8, wroth: 0.2 } },
        ]
    },

    daring_games: {
        frequency: 11,
        options: [
            /* keepitup */ { base: 10, brave: 2, craven: 0, result: { brave: 0.95 } },  // or death_accident!!!
            /* limit */ { base: 10, craven: 2, humble: 2, result: { humble: 0.5, honest: 0.5 } },
            /* curfew */ { base: 10, slothful: 2, cruel: 2, result: { slothful: 0.6, shy: 0.4 } },
        ]
    },

    does_god_exist: {
        frequency: 11,
        options: [
            /* ofcourse */ { base: 10, trusting: 2, humble: 2, result: { trusting: 0.7, humble: 0.3 } },
            /* zeal */ { base: 10, zealous: 10, cynical: 0, result: { zealous: 0.9, kind: 0.1 } },
            /* cyn */ { base: 10, cynical: 10, zealous: 0, result: { cynical: 0.7, proud: 0.3 } }
        ]
    },

    why_do_people_die: {
        frequency: 11,
        options: [
            /* carefree */ { base: 10, patient: 2, craven: 2, result: { patient: 0.6, craven: 0.3, slothful: 0.1 } },
            /* it happens */ { base: 10, brave: 2, arbitrary: 2, result: { brave: 0.5, arbitrary: 0.5 } },
            /* godsplan */ { base: 10, honest: 2, zealous: 8, result: { honest: 0.7, proud: 0.3 } }
        ]
    },

    will_i_rule: {
        frequency: 11,
        options: [
            /* ofcourse */ { base: 10, proud: 5, envious: 0, result: { proud: 0.8, greedy: 0.1, slothful: 0.1 } }, // if father is ruler & child is primary heir
            /* ifdeserve */ { base: 10, gregarious: 2, diligent: 5, ambitious: 5, result: { ambitious: 0.4, diligent: 0.4, gregarious: 0.2 } },
            /* nosilly */ { base: 10, envious: 10, result: { envious: 0.7, humble: 0.2, slothful: 0.1 } },  // if guardian is father, AI will never choose this option
        ]
    },

    // Older children flavor events
    // I'm giving these a frequency of "23" based on:
    // * on_action weight 50
    // * only half of ward age range
    // * more likely to already have 5 personality traits (or a specific blocker) at this age

    wild_parties: {
        frequency: 23,
        options: [
            /* awesome */ { base: 10, charitable: 5, lustful: 5, result: { charitable: 0.6, /*nonmuslim*/lustful: 0.4 } },
            /* curfew */ { base: 10, arbitrary: 5, chaste: 20, result: { arbitrary: 0.6, /*nonmuslim*/chaste: 0.4 } },
        ]
    },

    // Skipped: "If we're Catholic and our enemies are Catholic, why are we fighting?"

    why_is_church_rich: {  // christian only
        frequency: 23,
        options: [
            /* poor_heaven */ { base: 10, greedy: 2, zealous: 5, result: { zealous: 0.7, greedy: 0.3 } },
            /* lets_share */ { base: 10, charitable: 5, just: 3, result: { charitable: 0.7, just: 0.3 } }
        ]
    },


    poacher_let_go: {
        frequency: 23,
        options: [
            /* needed_deer */ { base: 10, just: 5, result: { kind: 0.7, just: 0.3 } },     // Omitted: both options have kind: 5
            /* good_deed */ { base: 10, arbitrary: 3, result: { kind: 0.7, arbitrary: 0.3 } },
        ]
    },

    peasants_like_slaves: {
        frequency: 23,
        options: [
            /* thatsright */ { base: 10, cruel: 2, arbitrary: 5, result: { arbitrary: 0.5, cruel: 0.4, proud: 0.1 } },
            /* curfew */ { base: 10, wroth: 5, proud: 2, result: { wroth: 0.8, proud: 0.2 } },
        ]
    },

    // Skipped: "If a tree falls in the woods" (guardian's traits are not considered)

    why_hassle_about_life: {   // not indian
        frequency: 23,
        options: [
            /* agree */ { base: 10, chaste: 3, temperate: 3, result: { chaste: 0.5, temperate: 0.5 } },
            /* enjoyment */ { base: 10, lustful: 5, gluttonous: 5, result: { lustful: 0.5, gluttonous: 0.5 } },
        ]
    },

    how_to_serve_god: {  // abrahamic religions
        frequency: 23,
        options: [
            /* be_brave */ { base: 10, brave: 5, result: { brave: 0.8, zealous: 0.2 } },
            /* be_just */ { base: 10, just: 5, result: { just: 0.8, zealous: 0.2 } },
        ]
    },

    // Skipped: "Female Child is playing with swords instead of sewing"

    // Skipped: "Child is ridiculed for cowardness" (based on guardian stats but not traits)

    // This one is unusual in that there isn't a choice, even for players.
    bloody_knife: {
        frequency: 50,  // NOT limited to older children, despite being in the older-children section
        options: [
            /* teach_more */ { base: 1, cruel: 10000, wroth: 10000, result: { cruel: 0.5, wroth: 0.25, craven: 0.25 } },
            /* ask */ { base: 1, arbitrary: 10000, result: { deceitful: 1 } },  // best event chain ever
            /* nopenopenope */ { base: 100, result: { kind: 0.5, patient: 0.25, brave: 0.25 } },
        ]
    },

    // Skipped: "Child hides away to read books" (only cruel has any effect on AI choice)

    // Skipped: "Ugly child" and "Fair (attractive) child"

    // Skipped: "Child shows a tendency to count money whenever possible..." (weird triggers & does not depend on guardian traits)

    // Skipped: "Child shows interest in visitors to the court" (weird triggers & only shy has any effect on AI choice)

    // Skipped: "Child constantly plays with swords and practices fighting with older men" (only craven has any effect on AI choice)

    first_kiss: {
        frequency: 10,  // specific trait requirements
        options: [
            /* courtly_love */ { base: 1, kind: 100, gregarious: 100, result: { chaste: 0.75, lustful: 0.25 } },
            /* virtues_and_sins */ { base: 1, zealous: 100, result: { chaste: 0.4, deceitful: 0.3, zealous: 0.25, paranoid: 0.5 } },
        ]
    },

    // Skipped: "Boy is spending all his time in the kitchen, risk becoming gluttonous and craven" (only boys, guardian traits irrelevant)

    // Skipped: "Too curious a child: Guardian finds him/her in the highest tower"
    // (The only important consideration is that cruel/wroth guardians can get the kid killed)

    // Skipped: "Ward is Ill"

    // Skipped: "Homosexual child"

    good_liar: {
        frequency: 35,  // intrigue skill requirements
        options: [
            /* machi */ { base: 1, deceitful: 100, result: { deceitful: 1 } },   // plus 2 ways to gain intrigue, a bad tooltip, and a script typo!
            /* that_tongue */ { base: 1, honest: 100, result: { honest: 0.8, deceitful: 0.2 } },
        ]
    },

};


/***************
 * COMPUTATION *
 ***************/

function factor_with_trait(event_option, guardian_trait)
{
    if (guardian_trait in event_option)
        return event_option.base * event_option[guardian_trait];

    return event_option.base;
}

function option_probabilities_with_trait(event, guardian_trait)
{
    var factors = event.options.map(option => factor_with_trait(option, guardian_trait));
    var total = sum(factors);
    return factors.map(f => f / total);
}

function expected_value(child_values, event_result)
{
    var e = 0;
    for (var outcome_trait in event_result) {
        var p = event_result[outcome_trait];  // how likely this outcome is
        var v = child_values[outcome_trait];  // how good or bad this outcome is
        e += p * v;
    }
    return e;
}

function sum(arr) { return arr.reduce((a, b) => a + b); }

function dot_product(a, b)
{
    if (a.length != b.length)
        throw("Invalid dot product");

    var dp = 0;
    for (var i = 0; i < a.length; ++i) {
        dp += a[i] * b[i];
    }
    return dp;
}

function calc_guardian_values(child_values)
{
    // Start with each guardian trait valued at 0.
    var guardian_traits = {};
    for (var guardian_trait in child_values) {
        guardian_traits[guardian_trait] = 0;
    }

    // For each event, compute the expected value to the child with no traits (null_impact) and with each trait (t_impact)
    for (var event_name in ward_and_guardian_events) {
        var event = ward_and_guardian_events[event_name];
        var values_of_options = event.options.map(option => expected_value(child_values, option.result));
        var null_impact = dot_product(values_of_options, option_probabilities_with_trait(event, "none"));
        //print("'" + event_name + "' with a traitless guardian: " + null_impact);
        for (guardian_trait in child_values) {
            var t_impact = dot_product(values_of_options, option_probabilities_with_trait(event, guardian_trait));
            var impact = t_impact - null_impact;
            if (impact !== 0) {
                //print("  ... but a " + guardian_trait + " guardian changes this by: " + impact);
                guardian_traits[guardian_trait] += event.frequency * impact / 100;
            }
        }
    }

    return guardian_traits;
}


/***********
 * DISPLAY *
 ***********/

// http://stackoverflow.com/a/21323330/3011305
function round(value, exp)
{
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp  = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

function pad(str, min)
{
    str = "" + str;
    while (str.length < min) {
        str += " ";
    }
    return str;
}

function list_values(prefix, values)
{
    for (var trait of DISPLAY_ORDER) {
        print(prefix + pad(trait + ":", 11) + " " + round(values[trait], 2));
    }
    print("");
}

function create_wiki_table(v)
{
    for (var trait of DISPLAY_ORDER) {
        print("|-");
        var captrait = trait.charAt(0).toUpperCase() + trait.slice(1);
        var row = "";
        row += "! " + pad("[[File:" + captrait + ".png]]", 24);
        row += "!! " + captrait + "\n";
        var cells = [];
        for (var column of v) {
            cells.push(pad(round(column[trait], 2), 10));
        }
        row += "| " + cells.join( " || " );
        print(row);
    }
    print("");
}


/******************
 * PLAYER OR HEIR *
 ******************/

var heir_iv = {
    diplomacy:          1.5,    // ruler designer uses 1
    martial:            1,      // ruler designer uses 1
    stewardship:        1,      // ruler designer uses 1
    intrigue:           1,      // ruler designer uses 1
    learning:           0.2,    // ruler designer uses 1

    monthly_prestige:   1,      // ruler designer uses 10
    monthly_piety:      1,      // ruler designer uses 20

    general_opinion:    2,      // for same- and opposite-trait opinions, multiplied by trait frequencies
    vassal_opinion:     1,      // ruler designer uses 1
    church_opinion:     0.25,   // ruler designer uses 0.5
    sex_appeal_opinion: 0.5     // ruler designer uses 0.5
};

var heir_values = calc_child_values(heir_iv);

// match ruler designer for demesne tax boost
heir_values.greedy += 5;

// i'm going to take the seduction focus first and become lustful, regardless of what my guardian does
//heir_values.lustful *= 0.3;
//heir_values.chaste *= 0.3;

// it's nice to be able to expel the jews without penalty
//heir_values.arbitrary += 0;
//heir_values.just -= 0;

// i like it when my troops survive battles, but i like it even more when i survive personally
//heir_values.patient += 0;
//heir_values.craven += 0;
//heir_values.brave -= 0;

// it's nice when plots don't succeed at killing me
//heir_values.paranoid += 0;
//heir_values.trusting -= 0;

list_values("Heir is ", heir_values);
list_values("Guardian of heir is ", calc_guardian_values(heir_values));


/**************************************
 * CARDINAL, ANTIPOPE, OR VASSAL POPE *
 **************************************/

var cardinal_iv = {
    diplomacy:          2,    // opinion for appointment, opinion as pope, moral authority boost
    martial:            0.1,
    stewardship:        0.2,
    intrigue:           0.1,
    learning:           0.5,  // small amount of monthly piety (for appointment and opinion), direct appointment effect, tech boost

    monthly_prestige:   0.01,
    monthly_piety:      1,

    general_opinion:    1,
    vassal_opinion:     0.1,
    church_opinion:     1.1,   // opinion AND virtue for appointment, opinion as pope
    sex_appeal_opinion: 0.1
};

var cardinal_values = calc_child_values(cardinal_iv);

// I want my pope to take the theology focus for +20 church opinion boost
const theology_focus_modifier = 1;
cardinal_values.cynical   += -1 * theology_focus_modifier;
cardinal_values.wroth     += -0.75 * theology_focus_modifier;
cardinal_values.ambitious += -0.75 * theology_focus_modifier;
cardinal_values.brave     += -0.75 * theology_focus_modifier;
cardinal_values.craven    += 0.5 * theology_focus_modifier;
cardinal_values.content   += 0.5 * theology_focus_modifier;
cardinal_values.patient   += 1.0 * theology_focus_modifier;
cardinal_values.zealous   += 2.0 * theology_focus_modifier;

list_values("Cardinal is ", cardinal_values);
list_values("Guardian of cardinal is ", calc_guardian_values(cardinal_values));





/***********************
 * LOYALTY OF A VASSAL *
 ***********************/


//var loyalty_and_stability_iv = {
//    diplomacy:          0.1,  // help a duke stay in power
//    martial:            0.1,  // help a duke stay in power
//    stewardship:        0.2,  // help a duke stay in power & make realm richer
//    intrigue:           0,    // help a duke stay in power BUT cannot plot against them
//    learning:           0.05, // tech gain
//
//    monthly_prestige:   0,
//    monthly_piety:      0,
//
//    general_opinion:    0.1,
//    vassal_opinion:     0.1,
//    church_opinion:     0.01,
//    sex_appeal_opinion: 0.01
//};

var loyalty_iv = {
    diplomacy:          0,
    martial:            0,
    stewardship:        0,
    intrigue:           0,
    learning:           0,

    monthly_prestige:   0,
    monthly_piety:      0,

    general_opinion:    0,
    vassal_opinion:     0,
    church_opinion:     0,
    sex_appeal_opinion: 0
};

var loyalty_values = calc_child_values(loyalty_iv);

function loyalty_from_factioning(factor) { return -10 * (factor - 1); }
function loyalty_from_liege_opinion(amount) { return amount; }

loyalty_values.envious += loyalty_from_liege_opinion(-15);
loyalty_values.ambitious += 0.25 * loyalty_from_liege_opinion(-50)
loyalty_values.content += loyalty_from_liege_opinion(50);

loyalty_values.proud += loyalty_from_factioning(1.5);
loyalty_values.brave += loyalty_from_factioning(1.5);
loyalty_values.arbitrary += loyalty_from_factioning(1.5);
loyalty_values.envious += loyalty_from_factioning(2);
loyalty_values.greedy += loyalty_from_factioning(2);
loyalty_values.deceitful += loyalty_from_factioning(2);
loyalty_values.ambitious += loyalty_from_factioning(4);
loyalty_values.content += loyalty_from_factioning(0.01);
loyalty_values.craven += loyalty_from_factioning(0.1);
loyalty_values.kind += loyalty_from_factioning(0.5);
loyalty_values.charitable += loyalty_from_factioning(0.5);
loyalty_values.honest += loyalty_from_factioning(0.5);
loyalty_values.humble += loyalty_from_factioning(0.75);
loyalty_values.just += loyalty_from_factioning(0.75);

list_values("Loyal vassal is ", loyalty_values);
list_values("Guardian of loyal vassal is ", calc_guardian_values(loyalty_values));


/***************
 * ADVENTURERS *
 ***************/


var adventurer_iv = {
    diplomacy:          3,
    martial:            0.5,  // not relevant for claimant adventures, but helpful for conquest and raiding
    stewardship:        0,
    intrigue:           0,
    learning:           0,

    monthly_prestige:   0,
    monthly_piety:      0,

    general_opinion:    0.5,  // help him stay in power after the war
    vassal_opinion:     0.25,
    church_opinion:     0,
    sex_appeal_opinion: 0
};

var adventurer_values = calc_child_values(adventurer_iv);

function adventurer_from_claimant_mtth(factor) { return 40 * ((1 / factor) - 1); }

adventurer_values.ambitious += adventurer_from_claimant_mtth(0.5);
adventurer_values.envious += adventurer_from_claimant_mtth(0.5);
adventurer_values.brave += adventurer_from_claimant_mtth(0.75);
adventurer_values.proud += adventurer_from_claimant_mtth(0.85);
adventurer_values.slothful += adventurer_from_claimant_mtth(1.5);
adventurer_values.humble += adventurer_from_claimant_mtth(1.5);
adventurer_values.kind += adventurer_from_claimant_mtth(2.0);

adventurer_values.craven = -40;
adventurer_values.content = -40;

list_values("Adventurer is ", adventurer_values);
list_values("Guardian of adventurer is ", calc_guardian_values(adventurer_values));


/**************
 * WIKI TABLE *
 **************/

create_wiki_table([
    heir_values,
    calc_guardian_values(heir_values),
    cardinal_values,
    calc_guardian_values(cardinal_values),
    loyalty_values,
    calc_guardian_values(loyalty_values),
    adventurer_values,
    calc_guardian_values(adventurer_values)
]);
