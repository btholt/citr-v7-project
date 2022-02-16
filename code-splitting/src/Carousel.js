import { Component } from "react";
import ThemeContext from "./ThemeContext";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          <ThemeContext.Consumer>
            {([theme]) => (
              <>
                {images.map((photo, index) => (
                  // eslint-disable-next-line
                  <img
                    onClick={this.handleIndexClick}
                    data-index={index}
                    key={photo}
                    src={photo}
                    className={index === active ? "active" : ""}
                    alt="animal thumbnail"
                    style={{
                      borderColor: theme,
                    }}
                  />
                ))}
              </>
            )}
          </ThemeContext.Consumer>
        </div>
      </div>
    );
  }
}

export default Carousel;
