package dev.mvc.team5.match.matchdto;

import dev.mvc.team5.match.Match;
import dev.mvc.team5.request.Request;
import dev.mvc.team5.reservations.Reservations;
import dev.mvc.team5.talents.Talent;
import dev.mvc.team5.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MatchCreateDTO {
    private Long requestno;
    private Long giverno;
    private Long receiverno;
    private Long talentno;
    private Long reservationno;
    
    public Match toEntity() {
      // 연관 엔티티들을 ID만 세팅한 상태로 생성
      Request request = new Request();
      request.setRequestno(this.requestno);

      User giver = new User();
      giver.setUserno(this.giverno);

      User receiver = new User();
      receiver.setUserno(this.receiverno);

      Talent talent = new Talent();
      talent.setTalentno(this.talentno);

      Reservations reservation = new Reservations();
      reservation.setReservationno(this.reservationno);

      // Match 엔티티에 설정
      Match match = new Match();
      match.setRequest(request);
      match.setGiver(giver);
      match.setReceiver(receiver);
      match.setTalent(talent);
      match.setReservation(reservation);

      return match;
  }
}
