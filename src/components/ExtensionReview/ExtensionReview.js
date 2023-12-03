import React, { useState, useEffect } from "react";
import "./ExtensionReview.css";
import { FaCircle } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";
import FlagMenu from "../FlagMenu/FlagMenu";
import { motion } from "framer-motion";

const ExtensionReview = ({
  handleTrigger,
  displayMode,
  onPage,
  addData,
  lan,
  handleGather,
  langSequence,
}) => {
  const [targetLanguage, setTargetLanguage] = useState(lan ? lan : "en");
  const [page, setPage] = useState(onPage ? onPage : "options");
  const [streamedInput, setStreamedInput] = useState("");
  const [streamedTitle, setStreamedTitle] = useState("");
  const [streamedContent, setStreamedContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isScaled, setIsScaled] = useState(false);
  const [endAnimation, setEndAnimation] = useState(false);
  const [bounce, setBounce] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  function startLanguageOrder() {
    console.log("am i here");
    const languageOrder = [
      "zh",
      "de",
      "fr",
      "es",
      "tr",
      "ja",
      "ko",
      "pl",
      "en",
    ];
    languageOrder.forEach((lang, index) => {
      setTimeout(() => {
        setIsScaled(true);
        setBounce(true);
        setTimeout(() => {
          setIsScaled(false);
          setBounce(false);
          if (index === languageOrder.length - 1) {
            setEndAnimation(true);
          }
        }, 500);
        setTargetLanguage(lang);
        setStreamedTitle(translatedData[lang].title);
        setStreamedContent(translatedData[lang].content);
      }, 800 * (index + 1));
    });
  }

  useEffect(() => {
    if (!langSequence) return;
    startLanguageOrder();
  }, [langSequence]);

  function simulateStreamingSyllables(
    message,
    onMessageCallback,
    onComplete,
    gather
  ) {
    const syllableLength = 3;
    let wordIndex = 0;
    let syllableIndex = 0;

    const words = message.split(" ");

    function streamNext() {
      if (syllableIndex * syllableLength >= words[wordIndex].length) {
        onMessageCallback(" ");
        wordIndex++;
        syllableIndex = 0;
        if (wordIndex >= words.length) {
          if (onComplete) onComplete();
          return;
        }
      }

      const word = words[wordIndex];
      const syllable = word.substring(
        syllableIndex * syllableLength,
        (syllableIndex + 1) * syllableLength
      );
      onMessageCallback(syllable);
      syllableIndex++;
    }

    const intervalId = setInterval(
      () => {
        streamNext();
        if (wordIndex >= words.length) {
          clearInterval(intervalId);
        }
      },
      page === "options" ? 100 : 15
    );
  }

  useEffect(() => {
    if (displayMode) {
      setLoading(false);

      if (page === "text") {
        setStreamedTitle(addData.title);
        setStreamedContent(addData.content);
        setTimeout(() => {
          handleGather();
        }, 5000);
      }

      //set title
      //set content

      //settimeout -> cordinatlari ekranin merkezine getir
    } else {
      setTimeout(
        () => {
          if (page === "options") {
            const input = "What exactly does this extension do?";
            simulateStreamingSyllables(
              input,
              (syllable) => {
                setStreamedInput((prevInput) => prevInput + syllable);
              },
              () => {
                setIsHovered(true);
                setIsActive(true);
                setTimeout(() => {
                  setIsHovered(false);
                  setIsActive(false);
                  setPage("text");
                }, 1000);
              }
            );
          } else if (page === "text") {
            setTimeout(() => {
              setLoading(false);
              if (handleTrigger) handleTrigger();

              const title =
                "Deepen Your Understanding, Access Information Instantly";
              const content =
                "Deep understanding and quick access while searching for information on the web is now just a click away. With SummaryAI, rapidly assimilate dense texts you encounter, directly from the page you are browsing, and transform them into meaningful and clear pieces of information. It simplifies even the most complex concepts, providing explanations clear enough for readers of all levels to easily grasp. Whether you are looking for a general summary or seeking in-depth knowledge with specific questions, SummaryAI personalizes and enriches your web experience. Transform your journey of knowledge discovery with SummaryAI and take the first step towards a more informed world. ";
              simulateStreamingSyllables(
                title,
                (syllable) => {
                  setStreamedTitle((prevTitle) => prevTitle + syllable);
                },
                () => {
                  simulateStreamingSyllables(
                    content,
                    (syllable) => {
                      setStreamedContent(
                        (prevContent) => prevContent + syllable
                      );
                    },
                    () => {
                      const languageOrder = [
                        "zh",
                        "de",
                        "fr",
                        "es",
                        "tr",
                        "ja",
                        "ko",
                        "pl",
                        "en",
                      ];
                      languageOrder.forEach((lang, index) => {
                        setTimeout(() => {
                          setIsScaled(true);
                          setTimeout(() => {
                            setIsScaled(false);
                            if (index === languageOrder.length - 1) {
                              setEndAnimation(true);
                            }
                          }, 500);
                          setTargetLanguage(lang);
                          setStreamedTitle(translatedData[lang].title);
                          setStreamedContent(translatedData[lang].content);
                        }, 2000 * (index + 1));
                      });
                    }
                  );
                }
              );
            }, 1000);
          }
        },
        page === "options" ? 3000 : 1000
      );
    }
  }, [page]);

  function handleTranslate(lang) {
    setTargetLanguage(lang);
    setStreamedTitle(translatedData[lang].title);
    setStreamedContent(translatedData[lang].content);
  }

  return (
    <div className="extension-container">
      <div className="header-container-2">
        <div className="header-2">
          <img
            src={require("../../assets/images/logo-white.png")}
            alt="Logo"
            className="logo"
          />
          <div className="header-title">SummaryAI</div>
        </div>
        <div className="header-buttons">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: bounce ? 1.4 : 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <FlagMenu
              targetLanguage={targetLanguage}
              handleTranslate={handleTranslate}
              page={page}
              // isScaled={isScaled}
              // endAnimation={endAnimation}
            />
          </motion.div>

          {/* <img
            className={`language-img ${isScaled ? "scale" : ""}`}
            alt="Language"
            src={require(`../../assets/images/flags/${targetLanguage}.png`)}
          /> */}
          <FaCircle className="header-btn close-btn" />
        </div>
      </div>
      {page === "options" ? (
        <div className={`options ${page === "options" ? "" : "fade-out"}`}>
          <div className="option-buttons">
            <div className="option-button">Summary</div>
            <div className="option-button">
              <span>Explain me</span>
              <span className="option-button-tooltip">
                (Explains the text in detail and clarity)
              </span>
            </div>
          </div>
          <div className="options-ask">
            <input
              className="question"
              placeholder="What does this have to do with quantum?"
              value={streamedInput}
            ></input>
            <div
              className={`send-btn ${isHovered ? "send-btn-hover" : ""} ${
                isActive ? "send-btn-active" : ""
              }`}
            >
              <BiSolidSend />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {page === "text" ? (
        <div
          className={`result-text ${page === "text" ? "fade-in" : "fade-out"}`}
        >
          <>
            {loading ? (
              <div
                className={`loading-container ${
                  loading ? "fade-in" : "fade-out"
                }`}
              >
                <div className="loading-spinner"></div>
                <div className="loading-title">Answering...</div>
              </div>
            ) : (
              ""
            )}
            <div className={`result-title`}>{streamedTitle}</div>
            <div className="result-summary">{streamedContent}</div>
          </>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExtensionReview;

const translatedData = {
  en: {
    title: "Deepen Your Understanding, Access Information Instantly",
    content:
      "Deep understanding and quick access while searching for information on the web is now just a click away. With SummaryAI, rapidly assimilate dense texts you encounter, directly from the page you are browsing, and transform them into meaningful and clear pieces of information. It simplifies even the most complex concepts, providing explanations clear enough for readers of all levels to easily grasp. Whether you are looking for a general summary or seeking in-depth knowledge with specific questions, SummaryAI personalizes and enriches your web experience. Transform your journey of knowledge discovery with SummaryAI and take the first step towards a more informed world.",
  },
  zh: {
    title: "加深理解，即时获取信息",
    content:
      "现在，在网络上搜索信息时，只需单击一下即可进行深入理解和快速访问。借助 SummaryAI，可以直接从您正在浏览的页面快速吸收您遇到的密集文本，并将其转换为有意义且清晰的信息。它甚至简化了最复杂的概念，提供足够清晰的解释，让各个级别的读者都能轻松掌握。无论您是寻找一般摘要还是寻求针对具体问题的深入知识，SummaryAI 都能个性化并丰富您的网络体验。使用 SummaryAI 改变您的知识发现之旅，迈出迈向更加信息灵通的世界的第一步。",
  },
  de: {
    title:
      "Vertiefen Sie Ihr Verständnis und greifen Sie sofort auf Informationen zu",
    content:
      "Tiefes Verständnis und schneller Zugriff bei der Suche nach Informationen im Internet sind jetzt nur einen Klick entfernt. Mit SummaryAI können Sie dichte Texte, auf die Sie stoßen, schnell direkt von der Seite, die Sie durchsuchen, verarbeiten und in aussagekräftige und klare Informationen umwandeln. Es vereinfacht selbst die komplexesten Konzepte und bietet Erklärungen, die so klar sind, dass Leser aller Niveaus sie leicht verstehen können. Egal, ob Sie eine allgemeine Zusammenfassung suchen oder vertiefendes Wissen mit spezifischen Fragen suchen, SummaryAI personalisiert und bereichert Ihr Web-Erlebnis. Transformieren Sie Ihre Reise der Wissensentdeckung mit SummaryAI und machen Sie den ersten Schritt in Richtung einer besser informierten Welt.",
  },
  fr: {
    title:
      "Approfondissez votre compréhension et accédez instantanément aux informations",
    content:
      "Une compréhension approfondie et un accès rapide lors de la recherche d'informations sur le Web sont désormais à portée de clic. Avec SummaryAI, assimilez rapidement les textes denses que vous rencontrez, directement depuis la page que vous parcourez, et transformez-les en informations significatives et claires. Il simplifie même les concepts les plus complexes, en fournissant des explications suffisamment claires pour que les lecteurs de tous niveaux puissent les comprendre facilement. Que vous recherchiez un résumé général ou des connaissances approfondies avec des questions spécifiques, SummaryAI personnalise et enrichit votre expérience Web. Transformez votre parcours de découverte des connaissances avec SummaryAI et faites le premier pas vers un monde plus informé.",
  },
  es: {
    title: "Profundice su comprensión, acceda a la información al instante",
    content:
      "La comprensión profunda y el acceso rápido mientras se busca información en la web ahora están a solo un clic de distancia. Con SummaryAI, asimile rápidamente los textos densos que encuentre, directamente desde la página que está navegando, y transfórmelos en piezas de información claras y significativas. Simplifica incluso los conceptos más complejos y proporciona explicaciones lo suficientemente claras para que los lectores de todos los niveles las comprendan fácilmente. Ya sea que esté buscando un resumen general o un conocimiento profundo con preguntas específicas, SummaryAI personaliza y enriquece su experiencia web. Transforme su viaje de descubrimiento de conocimientos con SummaryAI y dé el primer paso hacia un mundo más informado.",
  },
  tr: {
    title: "Anlayışınızı Derinleştirin, Bilgiye Anında Erişin",
    content:
      "Web'de bilgi ararken derinlemesine anlayış ve hızlı erişim artık yalnızca bir tık uzağınızda. SummaryAI ile karşılaştığınız yoğun metinleri doğrudan gezindiğiniz sayfadan hızla özümseyin, anlamlı ve net bilgilere dönüştürün. Her düzeydeki okuyucunun kolayca kavrayabileceği kadar net açıklamalar sunarak en karmaşık kavramları bile basitleştirir. İster genel bir özet arıyor olun ister belirli sorularla derinlemesine bilgi arıyor olun, SummaryAI web deneyiminizi kişiselleştirir ve zenginleştirir. SummaryAI ile bilgi keşfi yolculuğunuzu dönüştürün ve daha bilgili bir dünyaya doğru ilk adımı atın.",
  },
  ja: {
    title: "理解を深め、情報に瞬時にアクセス",
    content:
      "Web 上の情報を検索する際に、クリックするだけで深く理解し、迅速にアクセスできるようになりました。 SummaryAI を使用すると、閲覧しているページから直接、遭遇した緻密なテキストを迅速に吸収し、意味のある明確な情報に変換します。最も複雑な概念も単純化し、あらゆるレベルの読者が容易に理解できる明確な説明を提供します。一般的な概要を探している場合でも、特定の質問を含む深い知識を求めている場合でも、 SummaryAI はあなたの Web エクスペリエンスをパーソナライズし、充実させます。 SummaryAI で知識発見の旅を変革し、より情報に基づいた世界への第一歩を踏み出しましょう。",
  },
  ko: {
    title: "이해를 심화하고 정보에 즉시 접근하세요",
    content:
      "웹에서 정보를 검색하는 동안 깊은 이해와 빠른 액세스가 이제 클릭 한 번이면 됩니다. SummaryAI를 사용하면 탐색 중인 페이지에서 직접 접하는 밀집된 텍스트를 신속하게 동화하여 의미 있고 명확한 정보로 변환할 수 있습니다. 가장 복잡한 개념도 단순화하여 모든 수준의 독자가 쉽게 이해할 수 있을 만큼 명확한 설명을 제공합니다. 일반적인 요약을 찾거나 특정 질문에 대한 심층적인 지식을 찾고 있다면 SummaryAI는 웹 경험을 개인화하고 풍부하게 만듭니다. SummaryAI를 통해 지식 발견의 여정을 변화시키고 더 많은 정보를 갖춘 세상을 향한 첫 걸음을 내딛으세요.",
  },
  pl: {
    title:
      "Pogłębij swoje zrozumienie i uzyskaj natychmiastowy dostęp do informacji",
    content:
      "Dogłębne zrozumienie i szybki dostęp podczas wyszukiwania informacji w sieci jest teraz na wyciągnięcie ręki. Dzięki SummaryAI możesz szybko przyswajać napotkane gęste teksty bezpośrednio z przeglądanej strony i przekształcać je w znaczące i jasne informacje. Upraszcza nawet najbardziej złożone koncepcje, zapewniając wyjaśnienia wystarczająco jasne, aby czytelnicy na wszystkich poziomach mogli je łatwo zrozumieć. Niezależnie od tego, czy szukasz ogólnego podsumowania, czy pogłębionej wiedzy zawierającej konkretne pytania, SummaryAI personalizuje i wzbogaca Twoje doświadczenia internetowe. Zmień swoją podróż w kierunku odkrywania wiedzy dzięki SummaryAI i wykonaj pierwszy krok w kierunku bardziej świadomego świata.",
  },
};
