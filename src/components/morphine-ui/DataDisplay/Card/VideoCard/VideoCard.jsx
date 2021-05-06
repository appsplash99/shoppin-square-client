import {
  FaRegCalendar,
  FaRegClock,
  FaPlayCircle,
  FaBeer,
} from 'react-icons/fa';
import { RiPlayListAddFill } from 'react-icons/ri';
import { Btn, BtnInverted } from '../../../Button';
// import {}

export const VideoCard = ({ url, size, isPlayListItem }) => {
  return (
    <div
      className="video-card flex flex--column align-items--c justify-content--c p--sm gap--sm border-radius--sm"
      style={{ backgroundColor: 'var(--grey-200)', maxWidth: '440px' }}
    >
      <iframe
        clasName="video-card__iframe border-radius--sm"
        title="x"
        width="426"
        height="240"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
        style={{ borderRadius: '15px' }}
      />
      <div className="flex flex--column gap--xs">
        <div className="text--xl font-weight--600">Bohemian Rapsody</div>
        <div className="text--sm" style={{ color: 'var(--grey-800)' }}>
          Bohemian Rapsody Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. At delectus quo voluptatum, ipsam id itaque ex sunt minima
          reiciendis sapiente praesentium deleniti sed amet, esse voluptatibus
          ratione molestiae ipsum? Beatae.
        </div>
        <div className="flex align-items--c gap--xxs">
          <FaRegCalendar className="text--md" />
          <div>02 June 2021</div>
        </div>
        <div className="flex align-items--c gap--xxs">
          <FaRegClock className="text--md" />
          <div>11 a.m. IST, 1:30 p.m. SGT, 3:30 p.m. AEST</div>
        </div>
      </div>
      <div className="flex align-items--c justify-content--se gap--sm">
        <Btn variant="primary">
          <div className="flex align-items--c justify-content--sb gap px--sm">
            <FaPlayCircle />
            <div>Play Now</div>
          </div>
        </Btn>
        <BtnInverted variant="primary">
          <div className="flex align-items--c justify-content--sb gap px--sm">
            {/* <FaBeer /> */}
            <div>Add to Playlist</div>
          </div>
        </BtnInverted>
      </div>
    </div>
  );
};
