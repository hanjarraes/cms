import { Option, dummyQuestions } from "./main-page.dummy";
import Textarea from "component/text-area/text-area.component";
import Button from "component/button/button.component";
import DatePicker from "component/date-picker/date-picker.component";
import useMainPages from "./main-page.service";
import Modal from "component/modal/modal.component";
import LiveEditor from "component/live-editor/live-editor.component";

const MainPage = () => {
    const {
        answers,
        currentIndex,
        currentQuestion,
        modalWarning,
        isUserPresent,
        videoRef,
        canvasRef,
        timeLeft,
        handleFullscreen,
        formatTime,
        setIsRunning,
        handleFileChange,
        handleChange,
        handlePrevious,
        setCurrentIndex,
        handleNext,
    } = useMainPages();

    return (
        <div className="min-h-screen flex flex-col">
            <div>
                <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                {/* <p style={{ color: isUserPresent ? "green" : "red" }}>
                    {isUserPresent ? "✅ User is present" : "⚠️ No user detected!"}
                </p> */}
            </div>
            <div className="grid grid-cols-3 justify-between items-center bg-[--white] px-5 py-2 shadow-lg">
                <div className="flex w-fit gap-2 items-center bg-[--blue-v5] text-[--white] rounded-md pr-3 pl-2">
                    <i className="ri-timer-line text-[24px]" />
                    <div onClick={() => setIsRunning(true)}>{formatTime(timeLeft)}</div>
                </div>
                <h2 className="flex justify-center">Question {currentIndex + 1} of {dummyQuestions.length}</h2>
                <div className="flex gap-2 justify-end">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        variant="primary-inverse"
                        className="w-[100px]"
                        label="Previous"
                    />
                    <Button
                        onClick={handleNext}
                        disabled={currentIndex === dummyQuestions.length - 1}
                        variant="primary"
                        className="w-[100px]"
                        label="Next"
                    />
                </div>
            </div>
            <div className="flex-grow grid grid-cols-10 p-5 gap-4">
                <div className="col-span-1 bg-[--white] rounded-lg shadow-lg py-6 px-3 h-full">
                    <div className="w-full flex flex-wrap gap-2">
                        {dummyQuestions.map((_question, idx) => {
                            return (
                                <div key={`number-${idx}`}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`${currentIndex === idx ? 'bg-[--blue-v5]' : 'bg-[--blue-v3]'} text-[--white] h-[25px] w-[25px] flex items-center justify-center rounded-md font-bold text-[14px] cursor-pointer hover:bg-[--blue-v6]`}>
                                    {idx + 1}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={`${currentQuestion.type === 'codeText' ? 'col-span-3' : 'col-span-4' }  bg-[--white] rounded-lg shadow-lg p-6 h-full`}>
                    <div className="flex justify-center mb-5">
                        <div className="bg-[--blue-v5] text-[--white] h-[45px] w-[45px] flex items-center justify-center rounded-full font-bold text-[20px]">
                            {currentIndex + 1}
                        </div>
                    </div>
                    <div className="text-[18px] font-bold">{currentQuestion.title}</div>
                    {currentQuestion.description && <div className="text-[16px]">{currentQuestion.description}</div>}
                    {currentQuestion.img && (
                        <img
                            src={currentQuestion.img}
                            alt="img-awswer"
                            className={`w-full h-[500px] object-cover object-center rounded-md mt-2`}
                        />
                    )}

                </div>
                <div className={`${currentQuestion.type === 'codeText' ? 'col-span-6' : 'col-span-5' } bg-[--white] rounded-lg shadow-lg p-6 h-full`}>
                    <div className="question-container h-[calc(100vh-10rem)] overflow-auto">
                        {currentQuestion.type === "text" && (
                            <Textarea
                                name="answer"
                                value={answers[currentIndex] || ""}
                                onChange={handleChange}
                                className="min-h-[250px]"
                                placeholder="Type your answer here..." />
                        )}
                        {["radio", "select"].includes(currentQuestion.type) &&
                            "options" in currentQuestion && (
                                <div className="space-y-2">
                                    {currentQuestion.options.map((option: Option, idx: number) => (
                                        <label key={option.id || idx} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={`question-${currentIndex}`}
                                                value={option.text}
                                                checked={answers[currentIndex]?.includes(option.text)}
                                                onChange={handleChange}
                                                className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                                            />

                                            {option.img ? (
                                                <img
                                                    src={option.img}
                                                    alt={`img-${option.id}`}
                                                    className={`w-[200px] h-[200px] object-cover rounded-md mt-2`}
                                                />
                                            ) : (
                                                <span className="font-medium text-[--gray-v8]">
                                                    {`${String.fromCharCode(65 + idx)}. ${option.text}`}
                                                </span>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            )}

                        {currentQuestion.type === "checkbox" && currentQuestion.options && (
                            <div>
                                {currentQuestion.options.map((option: Option, idx: number) => (
                                    <label key={idx} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="answer"
                                            value={option.text}
                                            checked={answers[currentIndex]?.includes(option.text) || false}
                                            onChange={handleChange}
                                        />
                                        {option.img ? (
                                            <img
                                                src={option.img}
                                                alt={`img-${option.id}`}
                                                className={`w-[200px] h-[200px] object-cover rounded-md mt-2`}
                                            />
                                        ) : (
                                            <span className="font-medium text-[--gray-v8]">
                                                {option.text}
                                            </span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === "date" && (

                            <DatePicker
                                isRange={false}
                            // type="date"
                            // value={answers[currentIndex] || ""}
                            // onChange={handleChange}
                            />
                        )}

                        {currentQuestion.type === "time" && (
                            <input
                                type="time"
                                name="answer"
                                value={answers[currentIndex] || ""}
                                onChange={handleChange}
                            />
                        )}

                        {["file", "codeFile"].includes(currentQuestion.type) && (
                            <input type="file" onChange={handleFileChange} />
                        )}

                        {currentQuestion.type === "codeText" && (
                            <LiveEditor />
                        )}

                        {answers[currentIndex] && currentQuestion.type === "file" && (
                            <p>Uploaded file: {answers[currentIndex].filename}</p>
                        )}

                    </div>
                </div>
            </div>
            <Modal
                isModalOpen={modalWarning.isModalOpen}
                parentDivClassName="bg-[#ff0000a6] bg-opacity-50"
                className="md:w-1/4 mobile:min-w-0 min-w-[500px] !p-0 md:absolute sticky"
            >
                <div className="flex flex-1 flex-col">
                    {/* Header */}
                    <div className="flex font-bold text-size-L justify-between p-4 items-center border-b">
                        <div className="text-[--red-v3] flex gap-2 items-center">
                            <i className="ri-error-warning-line text-[24px]" />
                            Warning !!
                        </div>
                        <div className="flex justify-center items-center pl-4">
                            <i
                                className="ri-close-fill cursor-pointer text-[24px]"
                                onClick={() => {
                                    modalWarning.closeModalHandling()
                                }}
                            ></i>
                        </div>
                    </div>
                    <div className="p-4 text-[--red-v3] ">
                        Your mouse activity or user presence is no longer detected in the application. <span className="font-bold">Please return to continue.</span>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MainPage;
