import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQSection = ({ faqData, lang }) => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="space-y-5">
			{faqData.map((faq, index) => (
				<div key={index} className="border rounded-md bg-custom-yellow">
					<div
						className=" p-4 flex justify-between items-center cursor-pointer"
						onClick={() => toggleFAQ(index)}
					>
						<h3 className="text-lg font-semibold">
							{faq.question[lang]}
						</h3>
						{openIndex === index ? (
							<IoIosArrowUp className="text-xl" />
						) : (
							<IoIosArrowDown className="text-xl" />
						)}
					</div>
					<div
						className={`overflow-hidden transition-all duration-400 ${
							openIndex === index ? "max-h-96" : "max-h-0"
						}`}
					>
						<div className="p-4">{faq.answer[lang]}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default FAQSection;
