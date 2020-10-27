import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

function placeDetail() {
  const [url, setUrl] = useState(
    "https://mdbootstrap.com/img/Others/documentation/1.jpg"
  );
  return (
    <Container>
      <Row>
        <Col xs="5">
          <Row className="mt-5">
            <h3>Name:</h3>

            <h3>
              <br />
              Lorem ipsum dolor sit amet, primis abhorreant ne vim. Ignota
              diceret ei eos, ex ius nibh zril tincidunt. Malis accusamus
            </h3>
          </Row>
          <Row className="mt-2">
            <h3>Description:</h3>

            <p>
              <br />
              Lorem ipsum dolor sit amet, primis abhorreant ne vim. Ignota
              diceret ei eos, ex ius nibh zril tincidunt. Malis accusamus
              vituperata id nec, eam epicuri recteque ex. Id partem ceteros
              rationibus sit, choro habemus ius in. Quo blandit insolens
              gloriatur eu. In dicam munere est, affert doming sit id. Suas
              saepe scripta nam eu, ex his tritani ornatus corpora, ei solet
              deterruisset ius. Tollit ubique intellegebat vix cu, facilis
              voluptatibus vim et. Pericula neglegentur theophrastus usu no, et
              mei vide mandamus. Ut vim blandit intellegam, nec id error
              lobortis.
            </p>
          </Row>
        </Col>
        <Col xs="7">
          <Row>
            <img
              style={{ height: "400px", width: "700px" }}
              src={url}
              className="img-fluid"
              alt=""
            />
          </Row>
          <Row className="mt-3">
            <Col xs="4">
              <img
                style={{ height: "150px" }}
                src="https://c4.wallpaperflare.com/wallpaper/595/798/475/animals-blue-cats-eyes-wallpaper-preview.jpg"
                id="1"
                className="img-fluid"
                alt=""
                onclick="Image1()"
              />
            </Col>
            <Col xs="4">
              <img
                style={{ height: "150px" }}
                src="https://c4.wallpaperflare.com/wallpaper/629/286/513/anime-anime-girls-mx-shimmer-wallpaper-preview.jpg"
                id="2"
                className="img-fluid"
                alt=""
                onclick="Image2()"
              />
            </Col>
            <Col xs="4">
              <img
                style={{ height: "150px" }}
                src="https://mdbootstrap.com/img/Others/documentation/1.jpg"
                id="3"
                className="img-fluid"
                alt=""
                onclick="Image3()"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
<script>
  function Image1()
  {document
    .getElementById("img1")
    .setUrl(
      "https://c4.wallpaperflare.com/wallpaper/629/286/513/anime-anime-girls-mx-shimmer-wallpaper-preview.jpg"
    )}
</script>;
export default placeDetail;