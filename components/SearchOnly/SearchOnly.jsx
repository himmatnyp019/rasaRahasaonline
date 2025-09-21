import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { Link, Links } from 'react-router-dom';
import { t } from 'i18next';

const searchOnly = () => {
  return (
    <div>
        <Link to='/search' className="search-box-1">

        <form >
          <div data-aos="fade-up" className="search">
            <input
              type="text"
              placeholder={t("search")+"..."}
              value={""}
              onChange={(e) => {
                
              }}
            />
            <button type="submit" className="button">
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
          </div>
        </form>

    
      </Link>
    </div>
  )
}

export default searchOnly
