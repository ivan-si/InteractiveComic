

// Scene data (from the JavaScript scene manager system)
let scenes = {
  "scene_1": {
    scene_id: 1,
    image: "media/p1a.jpg",
    dialogue: "Where am I, and why am I dead?!",
    next_scenes: [2],
    interactive_elements: [{ element: "phone", triggers: 101, subtitle: "" },
    { element: "coffee_cup", triggers: null, subtitle: "The coffee cup is still warm." }
    ]
  },
  "scene_101": {
    scene_id: 101,
    image: "media/p1a_c1.jpg",
    dialogue: "",
    next_scenes: [2],
    interactive_elements: []
  },
  "scene_2": {
    scene_id: 2,
    image: "media/p2a.jpg",
    dialogue: "I remember I was working with my group. But something seemed off.",
    next_scenes: [201],
    interactive_elements: []
  },
  "scene_201": {
    scene_id: 201,
    image: "media/p2b.jpg",
    dialogue: "Why was everyone acting so off that day? Were they really annoyed at me, or was something deeper going on...?",
    next_scenes: [3],
    interactive_elements: [
      { element: "Ivan_Face", triggers: null, subtitle: "Ivan was really stressed out over the assignment." },
      { element: "Uditi_Face", triggers: null, subtitle: "Uditi was distracted by her phone." },
      { element: "Haroon_Face", triggers: null, subtitle: "Haroon was looking at me weird." }
    ]
  }, "scene_3": {
    scene_id: 3,
    image: "media/p3a.jpg",
    dialogue: "Uditi’s been acting strange. Why didn’t I notice this sooner? What was she hiding?",
    next_scenes: [4],
    interactive_elements: [
      { element: "Calendar", triggers: 301, subtitle: "", increments_clue_counter: true },
      { element: "Uditi_Laptop", triggers: 302, subtitle: "", increments_clue_counter: true },
    ]
  }, "scene_301": {
    scene_id: 301,
    image: "media/p3a_c1.jpg",
    dialogue: "That date… what was so important about today, Uditi?",
    next_scenes: [3],
    interactive_elements: []
  }, "scene_302": {
    scene_id: 302,
    image: "media/p3a_c2.jpg",
    dialogue: "What do they need to talk about?",
    next_scenes: [3],
    interactive_elements: []
  },
  "scene_4": {
    scene_id: 401,
    image: "media/p4a.jpg",
    dialogue: "What are you hiding, Haroon? That vial… is that part of your experiment?",
    next_scenes: [5],
    interactive_elements: [
      { element: "Vial", triggers: 401, subtitle: "", increments_clue_counter: true },
      { element: "Haroon_Papers", triggers: 402, subtitle: "", increments_clue_counter: true }]
  },
  "scene_401": {
    scene_id: 401,
    image: "media/p4a_c1.jpg",
    dialogue: "The research papers...",
    next_scenes: [4],
    interactive_elements: []
  }, "scene_402": {
    scene_id: 402,
    image: "media/p4a_c2.jpg",
    dialogue: "The vial...",
    next_scenes: [4],
    interactive_elements: []
  },
  "scene_5": {
    scene_id: 5,
    image: "media/p5a.jpg",
    dialogue: "Ivan, I know you were mad about the project. But were you really angry enough to kill me over it?",
    next_scenes: [6],

    interactive_elements: [
      { element: "Ivan_Phone", triggers: 501, subtitle: "", increments_clue_counter: true },
      { element: "Ivan_Papers", triggers: null, subtitle: "More strange papers...", increments_clue_counter: true }
    ]
  },
  "scene_501": {
    scene_id: 501,
    image: "media/p5a_c1.jpg",
    dialogue: "A message... Is this about me?",
    next_scenes: [5],
    interactive_elements: []
  },
  "scene_6": {
    scene_id: 6,
    image: "media/p6a.jpg",
    dialogue: "Incorrect ending, perhaps you didn't see enough clues... ",
    next_scenes: [null],
    interactive_elements: []
  },
  "scene_601": {
    scene_id: 601,
    image: "media/p6b.jpg",
    dialogue: "This is how I was murdered...",
    next_scenes: [602],
    interactive_elements: []
  },
  "scene_602": {
    scene_id: 601,
    image: "media/p6c.jpg",
    dialogue: "Congrats! You found enough clues and discovered Maryam's killers...",
    next_scenes: [null],
    interactive_elements: []
  }

};

let currentScene = scenes["scene_1"];

// Clue counter initialization
let clue_counter = 0;

function displayScene(scene) {
  document.getElementById("comic-image").src = scene.image;
  document.getElementById("dialogue-box").innerText = scene.dialogue;
  document.getElementById("subtitle").style.display = "none";

  // Hide all interactive elements by default
  document.querySelectorAll(".interactive-element").forEach(el => {
    el.style.display = "none";
    el.onclick = null;  // Remove previous click event
  });

  // Show interactive elements for the current scene
  scene.interactive_elements.forEach(interactive => {
    let el = document.getElementById(interactive.element);
    if (el) {
      el.style.display = "block";
      el.onclick = function () {
        handleInteraction(interactive, el);  // Pass the element to handleInteraction
      };
    }
  });
}

function handleInteraction(interactive, element) {
  if (interactive.triggers) {
    currentScene = scenes["scene_" + interactive.triggers];
    displayScene(currentScene);
  } else if (interactive.subtitle) {
    let subtitleBox = document.getElementById("subtitle");
    subtitleBox.innerText = interactive.subtitle;
    subtitleBox.style.display = "block";
  }

  // Increment the clue counter and hide the clicked element
  // Check if this interaction should increase the clue counter
  if (interactive.increments_clue_counter) {
    clue_counter++;
    console.log("Clue Counter: " + clue_counter);  // Log the clue count
  }
  element.style.display = "none";
}

// Updated next button logic
document.getElementById("next-btn").addEventListener("click", function () {
  if (!currentScene.next_scenes || currentScene.next_scenes.length === 0) {
    console.error("No next scenes available.");
    return;
  }

  let nextSceneId = currentScene.next_scenes[0];

  // Special check before going to Scene 6 endings
  if (currentScene.scene_id === 5) {
    // Check if clue_counter is 3 or more
    if (clue_counter >= 3) {
      currentScene = scenes["scene_601"];  // Good ending
    } else {
      currentScene = scenes["scene_6"];  // Wrong ending
    }
  } else {
    currentScene = scenes["scene_" + nextSceneId];

    // Check if the scene exists
    if (!currentScene) {
      console.error("Next scene is undefined or null.");
      return;
    }
  }

  displayScene(currentScene);
});


displayScene(currentScene);
