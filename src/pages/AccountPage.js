// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AccountPage.css";
// import { useLogoutMutation } from "../store";
// import { useNavigate } from "react-router-dom";

// const AccountPage = () => {
//   const [accountInfo, setAccountInfo] = useState({});
//   const [logout, logoutResult] = useLogoutMutation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getAccountInfo() {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/users/account",
//           {
//             headers: { "Content-Type": "application/json" },
//             withCredentials: true,
//           }
//         );
//         console.log("Response", response.data);
//         setAccountInfo(response.data.user);
//       } catch (error) {
//         console.log(error);
//         navigate("/", { replace: true });
//       }
//     }
//     getAccountInfo();
//   }, []);

//   const handleLogout = async (e) => {
//     logout()
//       .unwrap()
//       .then(() => {
//         console.log("Logout successful");

//         window.postMessage(
//           {
//             type: "DELETE_SUMMARYAI_SECRET_KEY",
//           },
//           "*"
//         );

//         navigate("/", { replace: true });
//       })
//       .catch((err) => console.log(err));
//   };

//   const sendUserKey = () => {
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDFiNmVkZjQ5MDdmZTlkZjExODNjOCIsImlhdCI6MTY5ODg0Nzg3MywiZXhwIjoxNzAxNDM5ODczfQ.qOEGjUKh1eSma0YJ1RsD7KWsbNZauUsHeCq8xJsn7Bs";

//     alert("User Key: " + token);
//   };

//   return (
//     <div className="account-container">
//       <div className="account-info-container">
//         <h1>Account Email: {accountInfo.email}</h1>
//         <div className="logoutButton" onClick={handleLogout}>
//           Logout
//         </div>
//       </div>

//       <div className="sendButton" onClick={sendUserKey}>
//         Send User KEY
//       </div>

//       <div className="text">
//         What should a person look for if they’re shopping for a supplement or
//         multivitamin? Check the label for daily value percentages. For instance,
//         if it says vitamin C, 200%, that basically tells you that you are
//         getting about 200% of your daily recommended value of vitamin C. I tell
//         my patients that you want to be somewhere between 50% to 200%. If you’re
//         shopping for a multivitamin, make sure the ingredient list lists all the
//         vitamins with their daily value percentages. Another thing to be mindful
//         of is that vitamins can be categorized into water soluble and fat
//         soluble. Some vitamins like A, D, E and K are fat soluble, and it’s
//         possible to overdose or get too much of them. That’s one reason a blood
//         test is really necessary; you want to understand whether or not you need
//         a certain vitamin, what dose is appropriate, and whether or not you’re
//         absorbing the right amount. Your body can eliminate excess doses of
//         water-soluble vitamins. Examples of water-soluble vitamins are vitamin
//         C, and the B vitamins like folate and b12. But if you’re taking
//         fat-soluble vitamins, then you wouldn’t necessarily want to exceed the
//         daily recommended values. Are there certain populations or age groups
//         for which supplements are highly recommended? Absolutely. Pregnant women
//         require supplementation because of their dietary and nutritional needs.
//         And it’s important they get their blood test done as part of their
//         routine checkups to make sure they’re taking the right doses. If someone
//         has IBS issues or an autoimmune disease of the gut that impairs their
//         ability to absorb vitamins and nutrition from food, they would benefit
//         from supplementation. The elderly population might also need
//         supplementation, if an individual’s diet isn’t varied enough. "Even
//         though I do recommend supplements to my patients, I always tell them it
//         is a bridge; supplementation is to fix a deficiency until you get your
//         diet up to a level where it is enough." — Dr. Chiti Parikh What are
//         common vitamins and supplements you end up telling patients to take? An
//         iron supplement might be beneficial for patients who experience heavy
//         periods with heavy bleeding. It’s common when young girls start
//         menstruating and losing blood to also lose more iron, and they might not
//         be getting enough from their diet. In my estimation, about 20% of the
//         women I see in my practice tend to be iron deficient. And often that’s
//         something that can be overlooked. People may also be deficient in
//         vitamin D, folate and B12. Folate, which is one of the B vitamins, and
//         B12 are very involved with brain health and our cognition. And studies
//         have shown that folate levels correlate with mood. Many people with
//         depression often have low levels of folate in their blood and in the
//         fluid around their brain. Folate is found in fresh vegetables, fruits,
//         and whole grains; if you’re eating mostly processed foods, you’re often
//         not getting enough folic acid. And since vitamin B12 is in eggs, meat
//         products and some dairy products, you might consider supplementing if
//         you’re vegan. What are your feelings about supplemental probiotics? One
//         question I often get about gut health is, “Which probiotic should I
//         take?” A lot of research has gone into understanding our gut microbiome
//         – the trillions of bacteria and microorganisms that live in the gut.
//         We’re learning more about how they impact basically everything in the
//         body, from our mood to our immune system. I always say that bacteria are
//         living, breathing things; they’re not just a chemical compound. We have
//         to make sure our diet is optimal to support these good bacteria so they
//         can live longer and continue to give us all the good benefits. A healthy
//         diet, with a lot of fruits, vegetables, legumes, and whole grains is
//         vital to support the bacteria in the gut. Overall, when it comes to
//         supplements, I encourage my patients to talk to their doctor and have an
//         honest conversation. Express curiosity in checking if you’re deficient
//         in any vitamins. If you learn that you do need to supplement, you can do
//         it with more information at hand.
//       </div>
//     </div>
//   );
// };

// export default AccountPage;
