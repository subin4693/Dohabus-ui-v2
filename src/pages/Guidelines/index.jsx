import React from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
const index = () => {
  return (
    <div>
      <Banner
        image={contactImg}
        title={"Guidelines"}
        subTitle={"Home | Guidelines"}
      />
      <div className="">
        <h1 className="text-center text-5xl mt-3 font-semibold text-custom-yellow">
          Read Guidelines
        </h1>
        <div className="text-2xl text-start py-10 px-5">
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            quibusdam minima id quae iure ratione pariatur sint molestias! Ea ut
            nulla corporis, facere explicabo officiis dolorem quos officia
            labore non.
          </p>
          <p className="mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
            reprehenderit quod, voluptate sequi ullam odit molestias cumque,
            recusandae quisquam obcaecati unde hic, eos placeat dolore? Nihil
            itaque ducimus architecto odit consequatur quam molestiae quo
            eligendi saepe quas, tempore officia aliquid modi earum
            exercitationem eaque vero, eius odio error! Quidem aliquid ut quis
            non tempora aliquam, maiores animi quibusdam accusantium soluta
            neque ullam nostrum velit, dolore esse sint vitae minima veniam
            incidunt id.
          </p>
          <p className="mt-3">
            Natus similique atque voluptatem. Ad fugiat atque eligendi. Suscipit
            voluptatem, facere nesciunt, voluptas dicta ducimus accusamus quos
            laboriosam quisquam aliquam sed inventore rem. Fugiat numquam odio
            consectetur rem?
          </p>
          <p className="mt-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut totam
            tempora debitis quos nihil ipsa eum at, porro sed expedita rerum
            temporibus, deserunt, quidem tempore assumenda? Quisquam iste quia
            ex.
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
